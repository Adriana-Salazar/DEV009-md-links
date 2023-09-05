const fs = require("fs");
const path = require("path");
const md = require("markdown-it")(); 
const { parse } = require("node-html-parser"); // Librería para parsear HTML
const {isMarkdownFile,
  readingFile,
  validateLinks,} = require('./data.js');



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

module.exports = mdLinks;