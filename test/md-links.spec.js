const mdLinks = require("../index.js");
const axios = require("axios");

jest.mock("axios");

describe("mdLinks", () => {
  it("debería rechazar con un error si la ruta no existe", () => {
    return mdLinks("/ruta/invalida").catch((error) => {
      expect(error.message).toBe("La ruta no existe");
    });
  });  
  it("debería devolver un array vacío si no hay archivos Markdown", () => {
    const emptyDirectory = "./test";
    return mdLinks(emptyDirectory, true).then((result) => {
      expect(result).toEqual([]);
    });
  }); 
  it("debería procesar archivos Markdown y devolver los enlaces", () => {
    const directoryWithMarkdownFiles = "./prueba2";
    return mdLinks(directoryWithMarkdownFiles, false).then((result) => {
      // Verifica que result contenga los enlaces esperados
      expect(result).toEqual([
        {
          href: "https://www.freecodecamp.org/",
          text: "freeCodeCamp",
          file: "C:\\Users\\diego\\Documents\\Laboratoria Proyectos\\DEV009-md-links\\prueba2\\practicar.md",
        },
        {
          href: "https://www.codewars.com/",
          text: "Codewars",
          file: "C:\\Users\\diego\\Documents\\Laboratoria Proyectos\\DEV009-md-links\\prueba2\\practicar.md",
        },
        {
          href: "https://leetcode.com/",
          text: "LeetCode",
          file: "C:\\Users\\diego\\Documents\\Laboratoria Proyectos\\DEV009-md-links\\prueba2\\practicar.md",
        },
      ]);
    });
  });
  it("deberia validar los links cuando el atributo validate = true", () => {
    const response = { status: 200 }; // Simulamos una respuesta exitosa
    axios.get.mockResolvedValue(response);

    return mdLinks("./aprendiendo", true).then((links) => {
      expect(links).toHaveLength(7);

      links.forEach((link) => {
        // Verifica que las propiedades necesarias estén presentes
        expect(link).toHaveProperty("href");
        expect(link).toHaveProperty("text");
        expect(link).toHaveProperty("file");
        expect(link).toHaveProperty("status", response.status); // Verificar el status usando response.status
        expect(link).toHaveProperty("ok", "ok");
      });
    });
  });
});
