const {
  isMarkdownFile,
  validateLinks,
  readingFile,
  readdirFiles,
} = require("../data.js");

const axios = require("axios");

jest.mock("axios");

describe("isMarkdownFile", () => {
  it("debería devolver true para archivos markdown", () => {
    // Prueba con diferentes extensiones de archivos markdown
    expect(isMarkdownFile("guia.md")).toBe(true);
    expect(isMarkdownFile("aprende.mdown")).toBe(true);
    expect(isMarkdownFile("07-milestone.text")).toBe(true);
  });
  it("debería devolver false para archivos no markdown", () => {
    // Prueba con archivos que no son markdown
    expect(isMarkdownFile("data.js")).toBe(false);
  });
});

describe("readingFile", () => {
  it("debe arrojar error si no logra leer el archivo tipo Markdown", () => {
    return readingFile(".prueba2/novalido.md").catch((err) => {
      expect(err).toBeDefined();
    });
  });
  it("debe leer el archivo", () => {
    const filePath = "./prueba2/practicar.md"; // Reemplaza con la ruta correcta a un archivo existente
    const expectedContent = "## Práctica Constante";
    ("La práctica es clave para mejorar. Aquí tienes algunas plataformas donde puedes practicar tus habilidades:");
    ("- [freeCodeCamp](https://www.freecodecamp.org/)·");
    ("- [Codewars](https://www.codewars.com/)·");
    ("- [LeetCode](https://leetcode.com/)·");

    return readingFile(filePath).then((data) => {
      expect(data).toMatch(expectedContent); //toMatch() verificar que el contenido del archivo contenga la cadena esperada, sin necesidad de coincidencia exacta en formato y espaciado
    });
  });
});

describe("validateLinks", () => {
  it("debería retornar un objeto con status 'ok' si la solicitud es exitosa y el enlace es válido", async () => {
    // Configurar el comportamiento del módulo axios burlado
    axios.get.mockResolvedValue({
      status: 200      
    });

    const result = await validateLinks("https://www.freecodecamp.org/");

    expect(result.status).toBe(200);
    expect(result.ok).toBe("ok");
  });
  it("debería retornar un objeto con status 'fail' si la solicitud es exitosa pero el enlace es inválido", async () => {
    // Configurar el comportamiento del módulo axios burlado
    axios.get.mockResolvedValue({
      status: 404
    });

    const result = await validateLinks("https://www.enlace-ficticio-roto.com");

    expect(result.status).toBe(404);
    expect(result.ok).toBe("fail");
  });
  it("debería retornar un objeto con status 'No Response' si no hay respuesta", () => {
    const responseError = new Error("No Response");
    responseError.response = undefined;
    axios.get.mockRejectedValue(responseError);

    return validateLinks("https://www.enlace-ficticio-roto.com").then(
      (result) => {
        expect(result).toEqual({
          status: "No Response",
          ok: "fail",
        });
      }
    );
  });
});

describe("readdirFiles", () => {
  // Directorio de prueba para tus archivos de prueba
  const testDirectory = "./prueba";

  it("debería devolver una lista de archivos y subdirectorios", () => {
    const result = readdirFiles(testDirectory);

    // Asegúrate de que result es un objeto con las propiedades "files" y "directories"
    expect(result).toHaveProperty("files");
    expect(result).toHaveProperty("directories");

    // Comprueba que "files" y "directories" son arreglos
    expect(Array.isArray(result.files)).toBe(true);
    expect(Array.isArray(result.directories)).toBe(true);
  });
  it("debería devolver archivos y subdirectorios correctamente", () => {
    const result = readdirFiles(testDirectory);
    // Asegúrate de que algunos archivos y subdirectorios específicos estén presentes
    expect(result.files).toContain("08-guiaweb03.md"); // Reemplaza con nombres de archivo y subdirectorios reales
    expect(result.directories).toContain("pasos"); // Reemplaza con nombres de archivo y subdirectorios reales
  });
  it("debería devolver arreglos vacíos en caso de error", () => {
    // Proporciona una ruta que no exista para forzar un error
    const nonExistentDirectory = "./directorio/inexistente";
    const result = readdirFiles(nonExistentDirectory);

    expect(result.files).toEqual([]);
    expect(result.directories).toEqual([]);
  });
});
