#!/usr/bin/env node
const mdLinks = require("./index.js");
const colors = require("colors");

const directoryPath = process.argv[2]; // Obtiene la ruta del directorio desde los argumentos de la línea de comandos
const validate = process.argv.includes("--validate"); // Verifica si se pasó '--validate' como argumento
const showStats = process.argv.includes("--stats"); // Se incluye '--stats' como argumento

if (!validate && !showStats) {
  // Si no se pasan opciones, establece validate en false
  mdLinks(directoryPath, false)
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










/*const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//rl.question('Ingrese la ruta del directorio: ', (directoryPath) => {
  rl.question('Si desea validar los enlaces, ingrese "--validate". De lo contrario, presione Enter: ', (directoryPath, answer) => {
    const validate = answer.trim() === '--validate';
    mdLinks(directoryPath, validate)
      .then((links) => {
        links.forEach((link) => {
          console.log(`href: ${link.href}\ntext: ${link.text}\nfile: ${link.file}`);
          if (validate) {
            console.log(`status: ${link.status || 'N/A'}\nok: ${link.ok ? 'ok' : 'fail'}`);
          }
          console.log('');
        });
        rl.close();
      })
      .catch((error) => {
        console.error('Error:', error.message);
        rl.close();
      });
  });
//});*/
