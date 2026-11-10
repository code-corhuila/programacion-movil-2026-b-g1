# Actividad Semana 07 - Programación Móvil

## 1. Kotlin

Se creó la clase `Producto(nombre, precio)` con validación de que el precio sea mayor o igual a 0, propiedades `val` y manejo de valores nulos.

El archivo `kotlin/Producto.kt` incluye ejemplos de uso con un producto válido, un nombre nulo y un precio negativo.

## 2. Ionic React

Se creó el componente funcional `Saludo`, que recibe un nombre, lo muestra en pantalla y contiene un botón para saludar.

Archivo: `ionic-react/Saludo.tsx`

## 3. Dos diferencias entre Kotlin y TypeScript

1. **Entorno de ejecución:** Kotlin es un lenguaje de propósito general utilizado, entre otros entornos, sobre la JVM; TypeScript es un superconjunto de JavaScript que se transforma a JavaScript para su ejecución.

2. **Nulabilidad:** Kotlin incorpora la nulabilidad en su sistema de tipos mediante tipos como `String?`. TypeScript también puede representar `null` y `undefined` mediante su sistema de tipos.

## Resultado esperado de Kotlin

```text
Producto: Computador
Precio: 2500000.0
--------------------
Producto: Producto sin nombre
Precio: 15000.0
--------------------
Error: El precio debe ser mayor o igual a 0
```
