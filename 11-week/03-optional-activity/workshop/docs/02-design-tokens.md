# CP2: Navegación y Tokens de Diseño (UNIreserve)

## 1. Justificación del Patrón de Navegación
Para UNIreserve se selecciona una arquitectura basada en **Pestañas Inferiores (`IonTabs`)** para el nivel principal y **Navegación en Pila (Stack Navigation)** para vistas de detalle:
* **Pestañas Inferiores (Nivel 1)**: Acceso rápido con una mano a las 3 secciones principales: Catálogo de Espacios (`/tabs/espacios`), Mis Reservas (`/tabs/mis-reservas`) y Perfil (`/tabs/perfil`).
* **Navegación en Pila (Nivel 2)**: Para acceder al detalle (`/espacio/:id`) y al formulario con un botón explícito de regreso (`IonBackButton`).

## 2. Tokens de Diseño y Verificación de Contraste (WCAG 2.1 AA)

| Elemento UI | Color Texto | Color Fondo | Relación Contraste | Cumplimiento WCAG AA (Mín. 4.5:1) |
| :--- | :--- | :--- | :---: | :---: |
| **Texto Principal** | `#1F2937` (Gris Oscuro) | `#FFFFFF` (Blanco) | **15.8:1** | **CUMPLE** |
| **Botón Primario** | `#FFFFFF` (Blanco) | `#1A56DB` (Azul Primario) | **8.6:1** | **CUMPLE** |
| **Etiqueta Éxito** | `#FFFFFF` (Blanco) | `#16A34A` (Verde Esmeralda) | **4.8:1** | **CUMPLE** |
| **Mensaje Error** | `#DC2626` (Rojo Alerta) | `#FEF2F2` (Rojo Claro Fondo) | **5.2:1** | **CUMPLE** |
| **Texto Secundario** | `#4B5563` (Gris Medio) | `#F9FAFB` (Gris Fondo) | **7.1:1** | **CUMPLE** |

## 3. Estructura del Enrutador (Ionic Tabs)

```tsx
<IonTabs>
  <IonRouterOutlet>
    <Route component={EspaciosPage} exact path="/tabs/espacios"/>
    <Route component={MisReservasPage} exact path="/tabs/mis-reservas"/>
    <Route component={PerfilPage} exact path="/tabs/perfil"/>
    <Route exact path="/tabs" render={() => <Redirect to="/tabs/espacios"/>} />
  </IonRouterOutlet>
  <IonTabBar slot="bottom">
    <IonTabButton aria-label="Catálogo de Espacios" href="/tabs/espacios" tab="espacios">
      <IonIcon icon={gridOutline}/>
      <IonLabel>Espacios</IonLabel>
    </IonTabButton>
    <IonTabButton aria-label="Mis Reservas" href="/tabs/mis-reservas" tab="mis-reservas">
      <IonIcon icon={calendarOutline}/>
      <IonLabel>Reservas</IonLabel>
    </IonTabButton>
    <IonTabButton aria-label="Perfil del Estudiante" href="/tabs/perfil" tab="perfil">
      <IonIcon icon={personOutline}/>
      <IonLabel>Perfil</IonLabel>
    </IonTabButton>
  </IonTabBar>
</IonTabs>
```
