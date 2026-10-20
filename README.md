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
- Zustand (estado global para favoritos)

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
├─ src/
│  ├── app/                      # Rutas (Expo Router)
│  │  ├── _layout.tsx            # Stack raíz de la navegación
│  │  ├── (tabs)/                # Grupo de pestañas
│  │  │  ├── _layout.tsx
│  │  │  ├── index.tsx           # → Pantalla Inicio
│  │  │  └── favorites.tsx       # → Pantalla Favoritos
│  │  └── pet/
│  │     └── [id].tsx            # Ruta dinámica: detalle de una mascota
│  ├── components/
│  │  ├── header.tsx             # Propio — encabezado reutilizable
│  │  ├── pet-card.tsx           # Propio — tarjeta reutilizable de mascota
│  │  ├── tag.tsx                # Propio — etiqueta reutilizable (edad, tamaño, etc.)
│  │  ├── chip.tsx               # Propio — botón en forma de píldora para las opciones de filtro
│  │  ├── filters-panel.tsx      # Propio — buscador + filtros por tipo y tamaño + botón de limpiar
│  │  ├── app-tabs.tsx           # Propio — navegación por pestañas (nativo)
│  │  ├── app-tabs.web.tsx       # Propio — navegación por pestañas (web)
│  │  ├── animated-icon.tsx      # De la plantilla — splash animado (en uso)
│  │  ├── animated-icon.web.tsx  # De la plantilla — splash animado, versión web
│  │  ├── external-link.tsx      # De la plantilla — usado en la barra de navegación web
│  │  ├── themed-text.tsx        # De la plantilla — soporte de tema claro/oscuro
│  │  └── themed-view.tsx        # De la plantilla — soporte de tema claro/oscuro
│  ├── screens/
│  │  ├── home-screen.tsx        # Listado principal en grilla, con buscador y filtros
│  │  ├── favorites-screen.tsx   # Listado de mascotas favoritas (filtrado con Zustand)
│  │  └── pet-detail-screen.tsx  # Detalle de una mascota
│  ├── store/
│  │  └── favorites-store.ts     # Store Zustand: marcar/desmarcar favoritos
│  ├── data/
│  │  └── pets.ts                # Datos estáticos tipados (interface Pet)
│  ├── utils/
│  │  └── pet-search.ts          # Funciones puras: filtrarMascotas y buscarPorNombre
│  ├── constants/
│  │  └── theme.ts               # Colores de marca (AppColors) + tema claro/oscuro
│  └── hooks/
│     ├── use-layout.ts          # Propio — columnas y márgenes según el ancho de pantalla
│     ├── use-theme.ts           # De la plantilla — usado por los componentes Themed*
│     └── use-color-scheme.ts    # De la plantilla — usado por use-theme
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

- **Componentes reutilizables y props**: Tag, Header, Chip, FiltersPanel y PetCard reciben sus datos exclusivamente por props; PetCard es el componente central que representa un elemento de la app (cumpliendo lo solicitado en la consigna, análogo a un MovieCard).
- **View, Text, Image, ScrollView**: usados en PetCard, FavoritesScreen y PetDetailScreen.
- **Datos estáticos tipados**: src/data/pets.ts, con una interface Pet que define la forma de cada mascota.
- **Listas dinámicas**: .map() para renderizar los chips de filtro y el listado de favoritos, y .filter() para los favoritos y para el buscador.
- **FlatList con grilla**: HomeScreen usa `FlatList` con `numColumns` (1, 2 o 3 columnas según el ancho de pantalla) y `ListEmptyComponent` para mostrar un mensaje cuando ninguna mascota coincide con los filtros.
- **Diseño responsive**: el hook `useLayout` usa `useWindowDimensions` para decidir cuántas columnas mostrar y qué márgenes aplicar. En pantallas anchas (web) los filtros pasan a una barra lateral; en el celular quedan arriba de la lista.
- **Estado local con `useState`**: HomeScreen guarda el texto de búsqueda y los filtros de tipo y tamaño, y se los pasa a `FiltersPanel` por props (_lifting state up_). Los inputs son controlados (`value` + `onChangeText`).
- **Funciones puras**: `filtrarMascotas` (src/utils/pet-search.ts) combina nombre, tipo y tamaño en una sola función, separada de la pantalla para poder testearla de forma aislada.
- **Navegación**: Expo Router con grupo de pestañas (tabs) y ruta dinámica pet/[id] para el detalle, usando router.navigate() y useLocalSearchParams().
- **Búsqueda de un elemento**: .find() para localizar la mascota correspondiente al id recibido por parámetro.
- **Estado global con Zustand**: `favorites-store.ts` centraliza qué mascotas están marcadas como favoritas (`favoriteIds`), con acciones `toggleFavorite` e `isFavorite`. Se consume con selectores (`useFavoritesStore((state) => state.favoriteIds)`) desde `PetCard`, `PetDetailScreen` y `FavoritesScreen`, sin pasar nada por props entre pantallas.

## Features

| #   | Features                                     | Estado          |
| --- | -------------------------------------------- | --------------- |
| 1   | Consultar el listado de mascotas disponibles | ✅ Implementada |
| 2   | Consultar el detalle de una mascota          | ✅ Implementada |
| 3   | Consultar mascotas favoritas                 | ✅ Implementada |
| 4   | Marcar/desmarcar una mascota como favorita   | ✅ Implementada |
| 5   | Filtrar mascotas por tipo y tamaño           | ✅ Implementada |
| 6   | Buscar una mascota por nombre                | ✅ Implementada |
| 7   | Solicitar la adopción de una mascota         | ⏳ Pendiente    |
| 8   | Modo oscuro/claro en componentes propios     | ⏳ Pendiente    |

> **Nota** esta no es la versión final del proyecto. Las features pendientes se irán incorporando a medida que se trabajen los próximos contenidos. Los datos son estáticos (`src/data/pets.ts`). El estado de "favorito" de cada mascota **sí es dinámico**: se maneja con un store de Zustand (`src/store/favorites-store.ts`) y se sincroniza automáticamente entre la pantalla de Inicio, Favoritos y el Detalle. La búsqueda y los filtros también son dinámicos, pero su estado es local a la pantalla de Inicio.
