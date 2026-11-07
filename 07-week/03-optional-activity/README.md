# Actividad práctica - Semana 7

## 1. Kotlin - Clase Producto

Se creó la clase `Producto` con las propiedades `nombre` y `precio`.

La clase utiliza `val` para declarar propiedades que no se pueden reasignar. El precio es de tipo `Double?`, permitiendo un valor numérico o `null`.

También se agregó una validación para evitar precios negativos mediante `require(precio == null || precio >= 0)`.

Se incluyen dos ejemplos: uno con precio definido y otro sin precio (`null`).

## 2. Ionic React - Componente Saludo

Se creó el componente funcional `Saludo` en TypeScript/React.

El componente recibe un nombre mediante una propiedad, muestra un saludo y contiene un botón que muestra un mensaje de saludo.

## 3. Diferencias entre Kotlin y TypeScript

### Diferencia 1: Uso y plataforma

Kotlin se utiliza ampliamente para el desarrollo de aplicaciones Android, mientras que TypeScript es un lenguaje basado en JavaScript utilizado principalmente para aplicaciones web y frameworks como React e Ionic.

### Diferencia 2: Manejo de tipos y nulabilidad

Kotlin permite expresar explícitamente la posibilidad de un valor nulo utilizando `?`, como `Double?`, y proporciona herramientas de null-safety.

TypeScript también permite trabajar con `null` y `undefined`, pero su sistema de tipos está basado en JavaScript y su comportamiento depende de la configuración del compilador, como `strictNullChecks`.

## Archivos de la actividad

- `Producto.kt`: clase Producto desarrollada en Kotlin.
- `Saludo.tsx`: componente funcional desarrollado con Ionic React y TypeScript.
- `README.md`: explicación de la actividad y diferencias entre Kotlin y TypeScript.
