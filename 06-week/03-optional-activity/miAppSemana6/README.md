# Semana 6 - Mi primer proyecto Ionic React

## Programación Móvil

### Descripción

En esta actividad práctica se realizó la configuración del entorno de
desarrollo para aplicaciones móviles utilizando Node.js e Ionic CLI.

Posteriormente, se creó y ejecutó un proyecto utilizando Ionic React
con la plantilla Blank, realizando una modificación en la pantalla
inicial.

## Objetivos

- Instalar Node.js LTS.
- Instalar Ionic CLI.
- Crear y ejecutar un proyecto Ionic React.
- Modificar el título de la pantalla inicial.
- Documentar el proceso realizado.

## Tecnologías utilizadas

- Node.js LTS
- npm
- Ionic CLI 7.2.1
- Ionic React
- Visual Studio Code
- Git
- GitHub

## Desarrollo de la actividad

### 1. Instalación de Node.js

Se instaló Node.js en su versión LTS, necesario para disponer del
entorno de ejecución requerido para el desarrollo del proyecto.

La instalación se verificó mediante los comandos:

```bash
node --version
npm --version
```

### 2. Instalación de Ionic CLI

Se instaló Ionic CLI utilizando el siguiente comando:

```bash
npm install -g @ionic/cli
```

Posteriormente, se verificó la instalación mediante:

```bash
ionic --version
```

La versión instalada de Ionic CLI fue:

```text
7.2.1
```

### 3. Creación del proyecto Ionic React

Se creó el proyecto utilizando Ionic React y la plantilla Blank
mediante el siguiente comando:

```bash
ionic start miAppSemana6 blank --type=react
```

Durante el proceso, Ionic creó la estructura inicial del proyecto
e instaló las dependencias necesarias.

### 4. Ingreso al directorio del proyecto

Una vez creado el proyecto, se ingresó a la carpeta correspondiente
mediante el siguiente comando:

```bash
cd miAppSemana6
```

### 5. Ejecución del proyecto

Para ejecutar la aplicación se utilizó el siguiente comando:

```bash
ionic serve
```

El servidor de desarrollo se ejecutó correctamente y permitió
visualizar la aplicación en el navegador mediante:

```text
http://localhost:8100
```

### 6. Modificación de la pantalla inicial

Se modificó el título de la pantalla inicial del proyecto.

El título original era:

```text
Blank
```

y fue cambiado por:

```text
Programación Móvil
```

También se modificó el título grande de la pantalla inicial por:

```text
Semana 6 - Mi primer proyecto Ionic React
```

Estos cambios fueron realizados en el archivo:

```text
src/pages/Home.tsx
```

### 7. Resultado

Después de realizar las modificaciones, se verificó nuevamente
la aplicación en el navegador y se comprobó que el proyecto
continuaba ejecutándose correctamente.

La pantalla inicial muestra el título:

**Programación Móvil**

## Evidencia

La evidencia de la actividad se encuentra en el archivo `ApMovil.png`,
en el cual se muestra el proyecto Ionic React ejecutándose correctamente
y el título de la pantalla inicial modificado.

## Conclusión

La actividad permitió realizar la configuración básica del entorno
de desarrollo para aplicaciones móviles utilizando Ionic React.

Se logró instalar Node.js e Ionic CLI, crear un proyecto Ionic React,
ejecutarlo mediante el servidor de desarrollo y modificar el título
de la pantalla inicial, cumpliendo con los objetivos establecidos
para la Semana 6.