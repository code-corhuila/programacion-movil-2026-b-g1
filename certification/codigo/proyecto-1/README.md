# Certificación Huawei - Cangjie Programming (Parte 1)

**Repositorio:** `juliangarcia8823-ux/programacion-movil-2026-b-g1`

---

## Estructura de la Parte 1

* `cjpm.toml`: Configuración base del paquete Cangjie.
* `src/programmer.cj`: Implementación de herencia (`open class Programmer`, subclase `CangjieProgrammer <: Programmer`) y sobrescritura de métodos (`override func writeCode()`).
* `src/car.cj`: Implementación de clase abstracta (`abstract class Car`), métodos abstractos y subclase concreta (`ElectricCar <: Car`).

---

## Registro de Cuestionarios Verificados

### Bloque A: Funciones del IDE
* **Pregunta 4 (Opción única):** ¿Cuál de las siguientes funciones proporciona un IDE? -> **B. Construir y compilar**
* **Pregunta 5 (Opción múltiple):** ¿Cuál de las siguientes funciones proporciona un IDE? -> **A, B, C, D, E** (Redacción de código, Construir y compilar, Depuración y seguimiento, Pruebas de ejecución, Gestión de proyectos)

### Bloque B: Configuración del Entorno y Resolución de Errores
* **Pregunta 1:** Después de instalar el complemento VS Code Cangjie, ¿qué ruta de clave debe configurarse? -> **A. Directorio de instalación de la cadena de herramientas de Cangjie**
* **Pregunta 2:** ¿Qué dependencia debe instalarse antes de instalar la cadena de herramientas Cangjie en Ubuntu? -> **B. AbrirSSL 3.0 (OpenSSL 3.0)**
* **Pregunta 3:** ¿Cuál es la forma correcta de desinstalar la cadena de herramientas Cangjie? -> **B. Elimine el directorio de instalación y elimine las variables de entorno**
* **Pregunta 4:** Para resolver el error "No se puede cargar la biblioteca estática ffi.c", ¿qué se debe comprobar? -> **A. `[[ffi.c]]` configuración de ruta**
* **Pregunta 5:** Cuando se produce el error "comando cjpm no encontrado", ¿qué se debe comprobar primero? -> **B. Variable de entorno PATH del sistema**

### Bloque C: Herramienta `cjpm` y Fundamentos de Compiladores
* **Pregunta 1:** ¿Cuál es la función principal de la herramienta `cjpm`? -> **D. Gestión de paquetes y construcción de proyectos**
* **Pregunta 2:** ¿Qué debe incluirse en el archivo de configuración `cjpm.toml`? -> **D. El campo `[paquete]` (`[package]`) para un solo módulo o el campo `[espacio de trabajo]` (`[workspace]`) para un espacio de trabajo de varios módulos**
* **Pregunta 3:** Después de instalar la cadena de herramientas Cangjie en Windows, ¿cómo puede verificar una instalación exitosa? -> **B. Ejecute el comando `cjc -v`**
* **Pregunta 4 (V/F):** Los lenguajes de programación permiten a los desarrolladores expresar algoritmos y lógica de una manera más cercana al lenguaje natural. -> **A. Verdadero**
* **Pregunta 5 (V/F):** El compilador es el intérprete entre el lenguaje de programación y el ordenador. -> **A. Verdadero**
* **Pregunta 6 (Opción múltiple):** Interdependencia entre lenguajes de programación y compiladores -> **B, C, D**
* **Pregunta 7 (Opción múltiple):** Componentes de un ordenador -> **A, B, C, D, E** (CPU, RAM, Almacenamiento, Entrada, Salida)
