const mdLinks = require('./mdlinks.js')

mdLinks("./Guiaweb.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

mdLinks("./Guiaweb.md", true)
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

  /*mdLinks("./Guiaweb.md", false)
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });*/


