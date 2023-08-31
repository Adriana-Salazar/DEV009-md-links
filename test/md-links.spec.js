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
  /*it("deberia validar los links cuando el atributo validate = true", () => {
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
  });*/
  it("deberia validar los links cuando el atributo validate = true", () => {
    const response = { status: 200 }; // Simulamos una respuesta exitosa
    axios.get.mockResolvedValue(response);
  
    return mdLinks('./Guiaweb.md', true)
      .then(links => {
        expect(links).toHaveLength(17);
  
        links.forEach(link => {
          // Verifica que las propiedades necesarias estén presentes
          expect(link).toHaveProperty("href");
          expect(link).toHaveProperty("text");
          expect(link).toHaveProperty("file");
          expect(link).toHaveProperty("status", response.status); // Verificar el status usando response.status
          expect(link).toHaveProperty("ok", "ok");
        });  
      });  
  }); 
  it("deberia devolver los enlaces sin validación cuando el atributo validate = false", () => {
    return mdLinks('./Guiaweb.md', false) // Configuramos validate como false
      .then(links => {
        expect(links).toHaveLength(17);
    
        links.forEach(link => {
            // Verifica que las propiedades básicas estén presentes
            expect(link).toHaveProperty("href");
            expect(link).toHaveProperty("text");
            expect(link).toHaveProperty("file");
        });  
      });
  });         
});

