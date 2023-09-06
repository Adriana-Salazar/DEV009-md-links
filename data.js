const fs = require("fs");
const path = require("path");
const axios = require("axios");

//Funcion que valida si el archivo es tipo markdown
function isMarkdownFile(filePath) {
  const markdownExtensions = [
    ".md",
    ".mkd",
    ".mdwn",
    ".mdown",
    ".mdtxt",
    ".mdtext",
    ".markdown",
    ".text",
  ];
  const fileExtension = path.extname(filePath);
  return markdownExtensions.includes(fileExtension);
}

//Funcion para leer los archivos
function readingFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Contenido de ${filePath}:`, data);
        resolve(data);
      }
    });
  });
}

//Funcion para validar los links y mostrar los status
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

//Funcion para leer directorios y listar sus archivos
function readdirFiles(directoryPath) {
  try {
    //const filePath = path.join(__dirname, directoryPath);
    const files = fs.readdirSync(directoryPath);
    return files;
  } catch (error) {
    console.error("Error:", error);
    return []; // En caso de error, devuelve un array vacío
  }
}

//console.log(path.join(__dirname, "./docs/milestone.md"))

//directory = readdirFiles("./prueba");
//console.log("Contenido del directorio:", directory);

module.exports = {
  isMarkdownFile,
  readingFile,
  validateLinks,
  readdirFiles,
};
