const mdLinks = require("./mdlinks.js");

/*mdLinks("./prueba")
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Links encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });*/

mdLinks("./prueba/fundamentos", true)
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

//console.log(path.join(__dirname, "./docs"))
