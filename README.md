# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalacion)
* [4. Guía de uso](#4-Guía de uso)
* [5. Resultados](#5-consideraciones-técnicas)
* [6. Diagrama de flujo](#6-hitos)
* [7. Planificación y Organización del Proyecto](#7-hacker-edition)


***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) Markdown es un lenguaje de marcado sencillo que sirve para agregar formato, vínculos e imágenes con facilidad al texto simple; en principio, fue pensado para elaborar textos cuyo destino iba a ser la web con más rapidez y sencillez que si estuviésemos empleando directamente HTML.  Actualmente es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y es muy común encontrar varios archivos en ese formato en cualquier tipo de
repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/sublime-editor-t.jpg)

## 2. Resumen del proyecto

En este proyecto se desarrolló una librería en Node.js que permite analizar archivos Markdown en un directorio y encontrar los enlaces contenidos en ellos. Puedes usar esta librería para realizar las siguientes tareas:

- Extraer información sobre los enlaces, como la URL, el texto del enlace y el archivo donde se encuentra.
- Validar enlaces HTTP para verificar su estado.
- Obtener estadísticas sobre los enlaces encontrados, como el total de enlaces, enlaces únicos y enlaces rotos.

## 3. Instalación

Para utilizar la librería mdLinks, primero debes instalarla en tu proyecto. Puedes hacerlo a través de npm (Node Package Manager) ejecutando el siguiente comando en la terminal:

![Install](./images/img1.png)

## 4. Guía de uso

### Desde la línea de comandos (CLI):
Puedes usar la librería mdLinks desde la línea de comandos de la siguiente manera:

![uso](./images/img2.png)

Donde < ruta-del-directorio > es la ruta al directorio que deseas analizar y [opciones] son las siguientes:

- --validate: Esta opción permite validar los enlaces HTTP encontrados.
- --stats: Esta opción muestra estadísticas sobre los enlaces encontrados.

Ejemplos de uso:

![uso-ejemplo](./images/img3.png)

![uso-validate](./images/img4.png)

![uso-stats](./images/img5.png)


Puedes combinar ambas opciones para obtener información detallada sobre los enlaces:

![opciones](./images/img6.png)


## 4. Resultados
La función mdLinks mostrará en la terminal, una lista de enlaces encontrados en los archivos Markdown del directorio especificado con la siguiente estructura:

- href: La URL del enlace.
- text: El texto del enlace.
- file: La ruta del archivo donde se encuentra el enlace.

Si se utilizan las opciones --validate o --stats, se mostrarán estadísticas o información de validación adicional, respectivamente.

- status: El estado de la validación del enlace (solo si se utiliza la opción --validate).
- ok: Indica si el enlace es válido o no (solo si se utiliza la opción --validate).

### Ejemplos
Ejemplo 1: Obtener enlaces sin validación

![uso-ejemplo](./images/img3.png)

Este comando mostrará una lista de enlaces encontrados en los archivos Markdown del directorio especificado.

![links](./images/img8.png)

Ejemplo 2: Obtener enlaces con validación

![uso-validate](./images/img4.png)

Este comando mostrará una lista de enlaces con información de validación, incluyendo el estado y la validez de cada enlace.

![links](./images/img9.png)

Ejemplo 3: Obtener estadísticas de enlaces

![uso-stats](./images/img5.png)

Este comando mostrará estadísticas sobre los enlaces encontrados, incluyendo el total de enlaces, enlaces únicos y enlaces rotos.

![links](./images/img10.png)

## 5. Diagrama de Flujo


## 6. Planificación y Organización del Proyecto

Este proyecto se desarrolla siguiendo una metodología ágil y aprovecha los tableros de proyectos de GitHub para una organización eficiente y un seguimiento efectivo del progreso.

Fases del Proyecto

Se ha dividido el proyecto en cinco fases diferentes, cada una de ellas representa una etapa significativa del desarrollo.

HITOS:paso a paso para la elaboración del proyecto

Tablero de Proyectos de GitHub (Github projects)

Durante el desarrollo del proyecto, se utilizó el tablero de proyectos de GitHub para gestionar las tareas y seguir el progreso de manera sistemática. El tablero está organizado en varias columnas que representan diferentes etapas del desarrollo:

1. Por Hacer: Esta columna contiene todas las tareas que están planificadas pero aún no han comenzado.

2. En Progreso: Las tareas en las que los colaboradores están trabajando activamente se mueven a esta columna.

3. Completado: Las tareas que han sido revisadas y terminadas con éxito se trasladan a esta columna.
























