# Actividad Semana 9 - Pantalla con lista y navegación en Ionic React

## Descripción

Aplicación desarrollada con Ionic React para la actividad práctica de la Semana 9 de Programación Móvil.

La aplicación contiene una pantalla principal con una lista de tareas, un contador manejado mediante useState y una segunda página a la cual se puede navegar utilizando React Router.

## Tecnologías utilizadas

- React
- Ionic React
- React Router
- Vite
- JavaScript

## Funcionalidades

### 1. Lista de elementos

La pantalla principal utiliza IonList e IonItem para mostrar cinco elementos:

1. Estudiar Programación Móvil
2. Practicar Ionic React
3. Realizar la actividad de la Semana 9
4. Revisar GitHub
5. Preparar la entrega

### 2. Estado con useState

Se implementó useState para manejar un contador.

Al presionar el botón "Aumentar contador", el valor del contador se incrementa.

### 3. Navegación

La aplicación cuenta con dos páginas:

- Página principal: /home
- Segunda página: /detalle

La navegación se realiza mediante React Router y useNavigate.

### 4. Componentes Ionic

Se utilizaron componentes de Ionic React como:

- IonList
- IonItem
- IonLabel
- IonButton
- IonContent
- IonHeader
- IonTitle
- IonToolbar

## Estructura principal

src/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
└── pages/
    ├── Home.jsx
    └── Detalle.jsx

## Instalación

Instalar las dependencias del proyecto:

npm install

## Ejecutar la aplicación

Para iniciar el servidor de desarrollo:

npm run dev

## Verificación

El proyecto fue verificado mediante:

npm run lint

y:

npm run build

Ambos comandos se ejecutaron correctamente.

## Autor

Julián Ernesto García Andrade

## Curso

Programación Móvil - Ingeniería de Sistemas

## Semana

Semana 9 - Corte 2 - Periodo 2026-B
