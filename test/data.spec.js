/*const mdLinks = require("../mdlinks.js");
const { validateLinks, readingFile, readdirFiles } = require("../data.js");
const axios = require("axios")



describe("validateLinks", () => {
  it("debería retornar un objeto con status 'No Response' si no hay respuesta", () => {
  const noResponse = { status: 404 };
  axios.get.mockRejectedValue(noResponse);

    return validateLinks("https://www.enlace-ficticio-roto.com").then((error) => {
      expect(error).toEqual({
      status: "No Response",
      ok: "fail",
      });
    });
  });
});

describe("readingFile", () => {
  it("debe arrojar error si no logra leer el archivo tipo Markdown", () => {
    return readingFile("./README.md").catch((err) => {
      expect(err).toBeDefined();
    });
  });
});  


describe('readdirFiles', () => {
  it('debería devolver una lista de archivos en el directorio existente', () => {
    const directoryPath = './prueba'; 
    const files = readdirFiles(directoryPath);

    expect(files).toHaveLength(5); 
  });

  it('debería devolver un array vacío para un directorio inexistente', () => {
    const directoryPath = './directorio_inexistente'; 
    const files = readdirFiles(directoryPath);

    expect(files).toEqual([]); // Debería devolver un array vacío si el directorio no existe
  });  
});*/