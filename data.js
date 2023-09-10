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
function readingFile(filePath,) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {        
        resolve(data);
      }
    });
  });
};

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
    const items = fs.readdirSync(directoryPath);
    
    const files = [];
    const directories = [];

    for (const item of items) {
      const itemPath = path.join(directoryPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        directories.push(item);
      } else {
        files.push(item);
      }
    }

    return {
      files,
      directories,
    };
  } catch (error) {    
    return {
      files: [],
      directories: [],
    };
  }
}

/*const directoryPath = './prueba';
const result = readdirFiles(directoryPath);

console.log('Archivos:', result.files);
console.log('Subdirectorios:', result.directories);*/

module.exports = {
  isMarkdownFile,
  readingFile,
  validateLinks,
  readdirFiles,
};
