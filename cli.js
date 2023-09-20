#!/usr/bin/env node

const mdLinks = require("./index.js");
const colors = require("colors");

const directoryPath = process.argv[2]; // Obtiene la ruta del directorio desde los argumentos de la línea de comandos
const validate = process.argv.includes("--validate"); // Se incluye '--validate' como argumento
const showStats = process.argv.includes("--stats"); // Se incluye '--stats' como argumento

if (!validate && !showStats) {
 
  mdLinks(directoryPath, false) //se establece validate en false
    .then((links) => {
      links.forEach((link) => {
        console.log(`href: ${link.href}`.blue);
        console.log(`text: ${link.text}`.white);
        console.log(`file: ${link.file}`.yellow);
        console.log("");
      });
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`.red);
    });
} else {
  mdLinks(directoryPath, validate)
    .then((links) => {
      if (validate) {
        links.forEach((link) => {
          console.log(`href: ${link.href}`.blue);
          console.log(`text: ${link.text}`.white);
          console.log(`file: ${link.file}`.yellow);
          if (link.ok === "ok") {
            console.log(`status: ${link.status || "N/A"}`.magenta);
            console.log(`ok: ${link.ok}`.green);
          } else {
            console.log(`status: ${link.status || "N/A"}`.red);
            console.log(`ok: ${link.ok}`.red);
          }
          console.log("");
        });
      }

      if (showStats) {
        const totalLinks = links.length;
        const uniqueLinks = new Set(links.map((link) => link.href)).size;
        const brokenLinks = links.filter((link) => link.ok !== "ok").length;
        console.log(`Total de enlaces: ${totalLinks}`.blue);
        console.log(`Enlaces únicos: ${uniqueLinks}`.magenta);
        console.log(`Enlaces rotos: ${brokenLinks}`.red);
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`.red);
    });
}











