const fs = require("fs");
const path = require("path");
const md = require("markdown-it")();
const { parse } = require("node-html-parser");
const { isMarkdownFile, readingFile, validateLinks, readdirFiles } = require("./data.js");

function mdLinks(directoryPath, validate) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(directoryPath);
    if (!fs.existsSync(absolutePath)) {
      reject(new Error("La ruta no existe"));
      return;
    }

    const { files, directories } = readdirFiles(absolutePath);
    const linksPromises = [];

    for (const filePath of files) {
      const fullFilePath = path.join(absolutePath, filePath);

      if (isMarkdownFile(fullFilePath)) {
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
      } else {
        console.error(`Error: ${fullFilePath} no es un archivo Markdown`);
      }
    }

    for (const subdirectory of directories) {
      const subdirectoryPath = path.join(absolutePath, subdirectory);
      const subdirectoryLinks = mdLinks(subdirectoryPath, validate);
      linksPromises.push(subdirectoryLinks);
    }

    Promise.all(linksPromises)
      .then((results) => {
        const allLinks = [];
        for (const result of results) {
          allLinks.push(...result);
        }
        resolve(allLinks);
      })
      .catch(reject);
  });
}

module.exports = mdLinks;


