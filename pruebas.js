const fs = require('fs');
const path = require("path");

//let files = fs.readdirSync("./docs");
//console.log(files);

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