# Bienvenidos a MascoMatch 🐾

# Descripción

**MascoMatch** es una aplicación móvil que facilita la adopción responsable de mascotas, conectando
refugios y personas que dan animales en adopción con adoptantes interesados.

Aborda la dificultad de encontrar, de forma centralizada y accesible, mascotas disponibles para
adopción en la zona del usuario, con información clara sobre cada animal (edad, tamaño, refugio de origen, ubicación, etc.).

Este repositorio corresponde al desarrollo del proyecto ABP (Aprendizaje Basado en Proyectos), construido de forma incremental a lo largo de la cursada de Aplicaciones Móviles.

---
## Integrantes

- Bruno, Franco Nicolás
- Heredia, Nahuel Valentín
- Lobera, Pastorino Mateo
- Oviedo, Danilo
- Torres Oliva, Héctor Gabriel

---

## Tecnologías

- React Native
- Expo + Expo Router
- TypeScript

## Cómo correr el proyecto

1. Instalación de dependencias

   ```bash
   npm install
   ```

2. Correr la app

   ```bash
   npx expo start
   ```

3. Escaneá el QR con **Expo Go** (el celular y la PC deben estar en la misma red WIFI) o presioná 'w' para abrir en el navegador.

## Estructura del proyecto
```
MascoMatch/
├─src/
│ ├── app/ # Rutas (Expo Router)
│ │ ├── \_layout.tsx # Stack raíz de la navegación
│ │ ├── (tabs)/ # Grupo de pestañas
│ │ │ ├── \_layout.tsx
│ │ │ ├── index.tsx # → Pantalla Inicio
│ │ │ └── favorites.tsx # → Pantalla Favoritos
│ │ └── pet/
│ │ └── [id].tsx # Ruta dinámica: detalle de una mascota
│ ├── components/
│ │ ├── header.tsx # Propio — encabezado reutilizable
│ │ ├── pet-card.tsx # Propio — tarjeta reutilizable de mascota
│ │ ├── tag.tsx # Propio — etiqueta reutilizable (edad, tamaño, etc.)
│ │ ├── app-tabs.tsx # Propio — navegación por pestañas (nativo)
│ │ ├── app-tabs.web.tsx # Propio — navegación por pestañas (web)
│ │ ├── animated-icon.tsx # De la plantilla — splash animado (en uso)
│ │ ├── animated-icon.web.tsx # De la plantilla — splash animado, versión web
│ │ ├── external-link.tsx # De la plantilla — usado en la barra de navegación web
│ │ ├── themed-text.tsx # De la plantilla — soporte de tema claro/oscuro
│ │ └── themed-view.tsx # De la plantilla — soporte de tema claro/oscuro
│ ├── screens/
│ │ ├── home-screen.tsx # Listado principal de mascotas
│ │ ├── favorites-screen.tsx # Listado de mascotas favoritas
│ │ └── pet-detail-screen.tsx # Detalle de una mascota
│ ├── data/
│ │ └── pets.ts # Datos estáticos tipados (interface Pet)
│ ├── constants/
│ │ └── theme.ts # Colores de marca (AppColors) + tema claro/oscuro
│ └── hooks/
│ ├── use-theme.ts # De la plantilla — usado por los componentes Themed\*
│ └── use-color-scheme.ts # De la plantilla — usado por use-theme
...
```
## Sobre los archivos de la plantilla de Expo

Este proyecto se generó con create-expo-app, que trae una base con soporte de tema claro/oscuro, splash screen animado y navegación web ya resueltos. Durante el desarrollo se eliminaron los archivos que eran solo contenido de demostración y no tenían ninguna dependencia real en el proyecto: collapsible.tsx, web-badge.tsx, hint-row.tsx, imágenes de ejemplo sin uso, y el script reset-project.js.

Se conservaron, en cambio, los archivos que forman parte de la infraestructura real de la app y que otros componentes propios utilizan activamente:

**themed-text.tsx** / **themed-view.tsx**: dan soporte de tema claro/oscuro; los usa app-tabs.web.tsx y app/\_layout.tsx.
**animated-icon.tsx** / **.web.tsx**: arman el splash animado que se ve al abrir la app.
**external-link.tsx**: usado por la barra de navegación en la versión web.
**use-theme.ts** / **use-color-scheme.ts**: hooks internos de los que dependen los componentes Themed\*.

Antes de borrar cada archivo se verificó, con búsqueda global en el proyecto, que no tuviera ninguna referencia activa — la decisión de mantener los de arriba es intencional y no un descuido de limpieza.

## Conceptos aplicados

- **Componentes reutilizables y props**: Tag, Header y PetCard reciben sus datos exclusivamente por props; PetCard es el componente central que representa un elemento de la app (cumpliendo lo solicitado en la consigna, análogo a un MovieCard).
- **View, Text, Image, ScrollView**: usados en PetCard, HomeScreen, FavoritesScreen y PetDetailScreen.
- **Datos estáticos tipados**: src/data/pets.ts, con una interface Pet que define la forma de cada mascota.
- **Listas dinámicas**: .map() para renderizar listados y .filter() para el listado de favoritos.
- **Navegación**: Expo Router con grupo de pestañas (tabs) y ruta dinámica pet/[id] para el detalle, usando router.navigate() y useLocalSearchParams().
- **Búsqueda de un elemento**: .find() para localizar la mascota correspondiente al id recibido por parámetro.

## Feature

| #   | Feature                                      | Estado          |
| --- | -------------------------------------------- | --------------- |
| 1   | Consultar el listado de mascotas disponibles | ✅ Implementada |
| 2   | Consultar el detalle de una mascota          | ✅ Implementada |
| 3   | Consultar mascotas favoritas                 | ✅ Implementada |
| 4   | Marcar/desmarcar una mascota como favorita   | ⏳ Pendiente    |
| 5   | Filtrar mascotas por tipo y tamaño           | ⏳ Pendiente    |
| 6   | Buscar una mascota por nombre                | ⏳ Pendiente    |
| 7   | Solicitar la adopción de una mascota         | ⏳ Pendiente    |
| 8   | Modo oscuro/claro en componentes propios     | ⏳ Pendiente    |

> **Nota** esta no es la versión final del proyecto. Las features pendientes se irán incomporando a medida que se trabajen los próximos contenidos. Los datos son estáticos ('src/data/pets.ts') Las mascotas favoritas están definidas en los datos ('isFavorites'); el usuario todavía no puede modificarlas desde la app (feature #4).
