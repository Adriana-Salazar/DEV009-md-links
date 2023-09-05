const fs = require('fs');
const path = require("path");
const axios = require("axios");

//let files = fs.readdirSync("./docs");
function isMarkdownFile(rutePath) {
  return path.extname(rutePath) === ".md";
};

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
};

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
};

function readdirFiles(directoryPath) {
    try {
     const files = fs.readdirSync(directoryPath);         
        console.log(files); 
    } catch (error) {
    };
};
//console.log(path.join(__dirname, "./docs/milestone.md"))

readdirFiles('./docs', (err, files) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Contenido del directorio:', files);
    }
  });


module.exports = {
  isMarkdownFile,
  readingFile,
  validateLinks,
}  