const fs = require("fs");
const path = require("path");
const md = require("markdown-it")(); // Importa y configura markdown-it
const { parse } = require("node-html-parser"); // Librería para parsear HTML
const axios = require("axios");

function isMarkdownFile(rutePath) {
  return path.extname(rutePath) === ".md";
}

function readingFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function validateLinks(url) {
  return axios
    .get(url)
    .then((response) => {
      return {
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? "ok" : "fail",
      };
    })
    .catch((error) => {
      return {
        status: error.response ? error.response.status : "No Response",
        ok: "fail",
      };
    });
}

function mdLinks(rutePath, validate) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(rutePath);
    if (!fs.existsSync(absolutePath)) {
      reject(new Error("La ruta no existe"));
    } else {
      if (!isMarkdownFile(absolutePath)) {
        reject(new Error("El archivo no es de tipo Markdown"));
      } else {
        // Si es un archivo markdown, lee el archivo
        readingFile(absolutePath)
          .then((data) => {
            const htmlContent = md.render(data); // Convierte el Markdown a HTML
            const root = parse(htmlContent); // Parsea el HTML con node-html-parser
            const links = [];

            root.querySelectorAll("a").forEach((anchor) => {
              links.push({
                href: anchor.getAttribute("href"),
                text: anchor.text,
                file: absolutePath,
              });
            });

            if (validate) {
              const validatePromises = links.map((link) => {
                return validateLinks(link.href) // Pasa link.href como la URL a validar
                  .then((validationResult) =>
                    Object.assign(link, validationResult)
                  )
                  .catch((error) => {
                    link.status = "Error";
                    link.ok = "fail";
                    return link;
                  });
              });

              Promise.all(validatePromises)
                .then((validatedLinks) => resolve(validatedLinks))
                .catch((error) => reject(error));
            } else {
              resolve(links);
            }
          })
          .catch((error) => {
            reject(error);
          });
      }
    }
  });
}

mdLinks("./Guiaweb.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

mdLinks("./Guiaweb.md", true)
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

  /*mdLinks("./Guiaweb.md", false)
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });*/

//console.log(path.join(__dirname, "./README.js"))

module.exports = mdLinks;