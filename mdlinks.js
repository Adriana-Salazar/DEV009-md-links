const fs = require("fs");
const path = require("path");
const md = require("markdown-it")();
const { parse } = require("node-html-parser"); // Librería para parsear HTML
const {
  isMarkdownFile,
  readingFile,
  validateLinks,
  readdirFiles,
} = require("./data.js");

function mdLinks(directoryPath, validate) {
  const absolutePath = path.resolve(directoryPath);
  if (!fs.existsSync(absolutePath)) {
    return Promise.reject(new Error("La ruta no existe"));
  }

  function processDirectory(dir) {
    const filesInDirectory = readdirFiles(dir);
    const linksPromises = [];

    for (const filePath of filesInDirectory) {
      const fullFilePath = path.join(dir, filePath);

      if (fs.existsSync(fullFilePath) && isMarkdownFile(filePath)) {
        const linkPromise = readingFile(fullFilePath)
          .then((fileContent) => {
            const htmlContent = md.render(fileContent);
            const root = parse(htmlContent);

            const links = root.querySelectorAll("a").map((anchor) => ({
              href: anchor.getAttribute("href"),
              text: anchor.text,
              file: fullFilePath,
            }));

            if (validate) {
              return Promise.all(
                links.map((link) =>
                  validateLinks(link.href)
                    .then((validationResult) =>
                      Object.assign(link, validationResult)
                    )
                    .catch(() => {
                      link.status = "Error";
                      link.ok = "fail";
                      return link;
                    })
                )
              );
            }

            return links;
          })
          .catch((error) => {
            console.error(`Error al procesar ${fullFilePath}: ${error.message}`);
            return [];
          });

        linksPromises.push(linkPromise);
      } else if (fs.statSync(fullFilePath).isDirectory()) {
        linksPromises.push(processDirectory(fullFilePath)); // Nueva recursión para directorios
      } else {
        console.error(`Error: ${fullFilePath} no es un archivo Markdown`);
      }
    }

    return Promise.all(linksPromises)
      .then((results) => {
        const links = results.reduce((acc, current) => acc.concat(current), []);
        return links;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  return processDirectory(absolutePath); // Inicia la recursión desde el directorio raíz
}

module.exports = mdLinks;
