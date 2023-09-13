#!/usr/bin/env node

const mdLinks = require(".");
const path = require("path");

let directoryPath = ""; // Inicialmente, no se especifica una ruta
let validate = false;

// Verifica si se pasa la opción --validate en los argumentos de línea de comandos
const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--validate") {
    validate = true;
  } else if (!arg.startsWith("--")) {
    // Si el argumento no comienza con '--', se considera una ruta
    directoryPath = path.resolve(arg);
  }
}

mdLinks(directoryPath, validate)
  .then((links) => {
    if (validate) {
      links.forEach((link) => {
        const statusInfo = link.ok ? "ok" : "fail";
        console.log(
          `href: ${link.href}\ntext: ${link.text}\nfile: ${link.file}\nstatus: ${link.status}\nok: ${statusInfo}\n`
        );
      });
    } else {
      links.forEach((link) => {
        console.log(
          `href: ${link.href}\ntext: ${link.text}\nfile: ${link.file}\n`
        );
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
