const mdLinks = require("../mdlinks.js");
const {
  isMarkdownFile,
  validateLinks,
  readingFile,
  readdirFiles,
} = require("../data.js");
const axios = require("axios");

jest.mock("axios");

describe("mdLinks", () => {
  it("debería rechazar con un error si la ruta no existe", () => {
    return mdLinks("/ruta/invalida").catch((error) => {
      expect(error.message).toBe("La ruta no existe");
    });
  });
  it("debería manejar directorios con subdirectorios y archivos Markdown", () => {
    return mdLinks("./prueba", false).then((links) => {
      expect(links).toHaveLength(11); // Ajusta el número esperado de enlaces según tus archivos de prueba
    });
  });
  it("debería devolver un array vacío si no hay archivos Markdown", () => {
    const emptyDirectory = "./test";
    return mdLinks(emptyDirectory, true).then((result) => {
      expect(result).toEqual([]);
    });
  });
  it("debe leer el archivo si es tipo Markdown", () => {
    return mdLinks("./README.md").then((data) => {
      expect(data).toBeDefined();
    });
  });
  it("debería rechazar con un error si el archivo no es tipo Markdown", () => {
    return mdLinks("./index.js").catch((error) => {
      expect(error.message).toBe("El archivo no es de tipo Markdown");
    });
  });
  it("debería manejar archivos Markdown sin enlaces", () => {
    const directoryWithNoLinks = "./prueba/novalido.md";
    console.log("Prueba ejecutada");
    return mdLinks(directoryWithNoLinks, false).then((result) => {
      expect(result).toEqual([]); // Verifica que no se haya encontrado ningún enlace
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
  it("debería devolver una promesa al iniciar desde el directorio raíz", () => {
    const result = mdLinks("./prueba", false);
    expect(result).toBeInstanceOf(Promise);
  });
});
