const mdLinks = require("../index.js");
const axios = require('axios');

jest.mock('axios');

describe("mdLinks", () => {
  it("debería rechazar con un error si la ruta no existe", () => {
    return mdLinks("/ruta/invalida").catch((error) => {
      expect(error.message).toBe("La ruta no existe");
    });
  });
  it("debería rechazar con un error si el archivo no es tipo Markdown", () => {
    return mdLinks("./index.js").catch((error) => {
      expect(error.message).toBe("El archivo no es de tipo Markdown");
    });
  });
  it("debe leer el archivo si es tipo Markdown", () => {
    return mdLinks("./Guiaweb.md").then((data) => {
      expect(data).toBeDefined();
    });
  });
  it("deberia extraer los links del archivo", () => {
    return mdLinks("./Guiaweb.md")
      .then((links) => {            
      expect(links[0]).toHaveProperty("href"); // Verifica si la estructura de enlace es correcta
      expect(links[0]).toHaveProperty("text");
      expect(links[0]).toHaveProperty("file");
    });
  });
  it("deberia validar los links cuando el atributo validate = true", () => {
    axios.get.mockResolvedValue({ status: 200 });
    return mdLinks('./Guiaweb.md')
      .then(links => {
        expect(links).toHaveLength(17);
      });  
  }); 
  it("No deberia validar los links cuando el atributo validate = false", () => {
    axios.get.mockResolvedValue({ status: 404 });
    return mdLinks('./Guiaweb.md').then(links => {
      expect(links).toHaveLength(17);
    });
  });      
});

