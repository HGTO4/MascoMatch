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
- Zustand (estado global: favoritos, mascotas, sesión y preferencia de tema)
- Jest + React Testing Library (tests de funciones, componentes, pantallas y stores)
- expo-image-picker, expo-camera y expo-location (publicación de mascotas)

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

> La cámara, la galería y la ubicación se prueban en un celular real: la primera vez que se usan, el sistema pide el permiso correspondiente. En el navegador algunas de estas funciones están limitadas.

## Tests

El proyecto usa **Jest** (con el preset `jest-expo`) y **React Testing Library** para React Native.

```bash
npm test
```

Qué se prueba actualmente:

**`utils`**

- **`filtrarMascotas`** (`src/utils/__tests__/pet-search.test.ts`): función pura que combina nombre, tipo y tamaño. Cubre cada filtro por separado, la combinación de los tres, mayúsculas/minúsculas, espacios al final del texto y búsquedas sin resultados.
- **`validarSolicitud` y `esSolicitudValida`** (`src/utils/__tests__/adoption.test.ts`): reglas de validación del formulario de adopción (nombre, email, mensaje y teléfono opcional). Los errores se acumulan por campo.
- **`validarIngreso` y `esIngresoValido`** (`src/utils/__tests__/auth.test.ts`): funciones de validación del formulario de ingreso (nombre y email). Cubre nombres vacíos o compuestos por espacios, emails sin formato válido, espacios alrededor de un email válido, errores en ambos campos y la comprobación de si existen errores.
- **`validarPublicacion`, `esPublicacionValida` y `armarMascota`** (`src/utils/__tests__/publish.test.ts`): funciones de validación y construcción de publicaciones. Comprueba los campos obligatorios, tipos de mascota inexistentes, descripción inferior a 20 caracteres, acumulación de errores, validación general y construcción del objeto mascota con sus datos, raza predeterminada, limpieza de espacios y fotografía seleccionada.

**`screens`**

- **`AdoptionScreen`** (`src/screens/__tests__/adoption-screen.test.tsx`): muestra los errores al enviar vacío, la confirmación con datos válidos y la navegación de los botones. Usa `jest.mock("expo-router")` para simular la navegación, y `beforeEach` para limpiar las funciones espía entre tests.
- **`ProfileScreen`** (`src/screens/__tests__/profile-screen.test.tsx`): pantalla de perfil e ingreso de usuario. Comprueba que se muestre el formulario sin sesión, los errores al ingresar con campos vacíos, el saludo con datos válidos, la navegación al publicar una mascota y el cierre de sesión. Usa `jest.mock("expo-router")` para simular la navegación y reinicia el estado del store antes de cada test.
- **`PublishScreen`** (`src/screens/__tests__/publish-screen.test.tsx`): pantalla de publicación de mascotas. Comprueba que se solicite iniciar sesión, la navegación al perfil, los errores al enviar el formulario vacío, la selección y vista previa de fotografías desde la galería, el rechazo de permisos y la publicación correcta de una mascota con navegación al inicio. Usa mocks de `expo-router`, `expo-image-picker` y `expo-location`, y reinicia los stores antes de cada test.

**`components`**

- **`ThemeToggle`** (`src/components/__tests__/theme-toggle.test.tsx`): al tocar el botón cambia el modo guardado en el store de Zustand y el ícono (sol/luna). Se prueba con el store real, reiniciando su estado antes de cada test.
- **`FormField`** (`src/components/__tests__/form-field.test.tsx`): campo reutilizable de formulario. Comprueba que se muestre la etiqueta y el valor, que se comunique el texto ingresado mediante `onChangeText` y que se visualice el mensaje de error cuando corresponde.
- **`FiltersPanel`** (`src/components/__tests__/filters-panel.test.tsx`): muestra las opciones de filtro, avisa qué chip se tocó y muestra el botón "Limpiar filtros" solo cuando hay filtros activos.
- **`LocationButton`** (`src/components/__tests__/location-button.test.tsx`): botón que obtiene la ubicación del dispositivo y detecta la ciudad. Cubre los casos de permisos concedidos o rechazados, GPS desactivado, ciudad no detectada y errores durante la geocodificación. Usa `jest.mock("expo-location")` para simular el servicio de ubicación.

**`store`**

- **`useSessionStore`** (`src/store/__tests__/session-store.test.ts`): store de Zustand encargado de administrar la sesión del usuario. Comprueba que inicialmente no haya un usuario, que `ingresar` guarde correctamente sus datos y que `salir` elimine la sesión. Reinicia el estado antes de cada test.

Detalles de configuración:

- En `package.json`, la clave `jest` define el preset y un `moduleNameMapper` que resuelve el alias `@/` hacia `src/`.
- Los archivos `.css` (importados por `constants/theme.ts`) se reemplazan en Jest por `src/__mocks__/style-mock.js`, porque Jest no sabe leerlos.
- En `tsconfig.json`, `"types": ["jest"]` hace que el editor reconozca `describe`, `it` y `expect` (TypeScript 6 ya no carga los tipos de `@types` automáticamente).
- React Testing Library 14 requiere el paquete `test-renderer`, que figura en las dependencias de desarrollo.

## Estructura del proyecto

```
MascoMatch/
├─ src/
│  ├── app/                      # Rutas (Expo Router)
│  │  ├── _layout.tsx            # Stack raíz de la navegación
│  │  ├── publish.tsx            # → Pantalla Publicar mascota
│  │  ├── (tabs)/                # Grupo de pestañas
│  │  │  ├── _layout.tsx
│  │  │  ├── index.tsx           # → Pantalla Inicio
│  │  │  ├── favorites.tsx       # → Pantalla Favoritos
│  │  │  └── profile.tsx         # → Pantalla Perfil (ingreso y cuenta)
│  │  ├── adopt/
│  │  │  └── [id].tsx            # Ruta dinámica: formulario de adopción de una mascota
│  │  └── pet/
│  │     └── [id].tsx            # Ruta dinámica: detalle de una mascota
│  ├── components/
│  │  ├── __tests__/
│  │  │  ├── filters-panel.test.tsx  # Tests del panel de filtros
│  │  │  ├── theme-toggle.test.tsx   # Tests del botón de modo claro/oscuro
│  │  │  ├── form-field.test.tsx          # Tests de los campos de formulario
│  │  │  └── location-button.test.tsx     # Tests del botón de ubicación
│  │  ├── header.tsx             # Propio — encabezado reutilizable
│  │  ├── pet-card.tsx           # Propio — tarjeta reutilizable de mascota
│  │  ├── tag.tsx                # Propio — etiqueta reutilizable (edad, tamaño, etc.)
│  │  ├── chip.tsx               # Propio — botón en forma de píldora para las opciones de filtro
│  │  ├── filters-panel.tsx      # Propio — buscador + filtros por tipo y tamaño + botón de limpiar (se pliega en el celular)
│  │  ├── form-field.tsx         # Propio — campo de formulario con etiqueta, mensaje de error y  contador de caracteres
│  │  ├── option-picker.tsx      # Propio — grupo de chips para elegir una opción en un formulario
│  │  ├── photo-picker.tsx       # Propio — vista previa de la foto y botones de cámara y galería
│  │  ├── camera-capture.tsx     # Propio — pantalla de cámara (expo-camera) con permisos, giro y captura
│  │  ├── location-button.tsx    # Propio — botón que completa la ciudad con el GPS
│  │  ├── theme-toggle.tsx       # Propio — botón sol/luna para alternar el modo claro/oscuro
│  │  ├── app-tabs.tsx           # Propio — navegación por pestañas (nativo)
│  │  ├── app-tabs.web.tsx       # Propio — navegación por pestañas (web)
│  │  ├── animated-icon.tsx      # De la plantilla — splash animado (en uso)
│  │  ├── animated-icon.web.tsx  # De la plantilla — splash animado, versión web
│  │  ├── themed-text.tsx        # De la plantilla — texto que toma su color de la paleta activa
│  │  └── themed-view.tsx        # De la plantilla — vista que toma su fondo de la paleta activa
│  ├── screens/
│  │  ├── __tests__/
│  │  │  ├── adoption-screen.test.tsx  # Tests del formulario de adopción
│  │  │  ├── profile-screen.test.tsx   # Tests de la pantalla de perfil
│  │  │  └── publish-screen.test.tsx   # Tests de la pantalla de publicación
│  │  ├── home-screen.tsx        # Listado principal en grilla, con buscador y filtros
│  │  ├── favorites-screen.tsx   # Listado de mascotas favoritas (filtrado con Zustand)
│  │  ├── pet-detail-screen.tsx  # Detalle de una mascota, con acceso a la solicitud de adopción
│  │  ├── adoption-screen.tsx    # Formulario de solicitud de adopción y pantalla de confirmación
│  │  ├── profile-screen.tsx     # Ingreso simulado y datos de la cuenta
│  │  └── publish-screen.tsx     # Formulario para publicar una mascota (foto, ubicación, validación)
│  ├── store/
│  │  ├── __tests__/
│  │  │  └── session-store.test.ts        # Tests del store de sesión
│  │  ├── favorites-store.ts     # Store Zustand: marcar/desmarcar favoritos
│  │  ├── pets-store.ts          # Store Zustand: lista de mascotas y alta de nuevas publicaciones
│  │  ├── session-store.ts       # Store Zustand: usuario que ingresó (sesión simulada)
│  │  └── theme-store.ts         # Store Zustand: preferencia de tema (sistema, claro u oscuro)
│  ├── data/
│  │  └── pets.ts                # Datos estáticos tipados (interface Pet)
│  ├── utils/
│  │  ├── __tests__/
│  │  │  ├── pet-search.test.ts  # Tests de filtrarMascotas
│  │  │  ├── adoption.test.ts    # Tests de validarSolicitud y esSolicitudValida
│  │  │  ├── auth.test.ts        # Tests de validarIngreso y esIngresoValido
│  │  │  └── publish.test.ts     # Tests de validarPublicacion, esPublicacionValida y armarMascota
│  │  ├── pet-search.ts          # filtrarMascotas: nombre, tipo y tamaño combinados
│  │  ├── adoption.ts            # Validación de la solicitud de adopción
│  │  ├── auth.ts                # Validación del ingreso
│  │  ├── publish.ts             # Validación de la publicación y armado de la mascota
│  │  └── location.ts            # nombreCiudad: elige la ciudad de una dirección geocodificada
│  ├── __mocks__/
│  │  └── style-mock.js          # Reemplazo de archivos .css para Jest
│  ├── constants/
│  │  └── theme.ts               # Paletas clara y oscura (AppPalettes), espaciados y tipografías
│  └── hooks/
│     ├── use-layout.ts          # Propio — columnas y márgenes según el ancho de pantalla
│     ├── use-app-colors.ts      # Propio — devuelve la paleta del modo activo
│     ├── use-resolved-scheme.ts # Propio — combina la preferencia del usuario con el modo del sistema
│     ├── use-theme.ts           # De la plantilla — usado por los componentes Themed*
│     ├── use-color-scheme.ts    # De la plantilla — modo del sistema (nativo)
│     └── use-color-scheme.web.ts # De la plantilla — modo del sistema (web, evita desajustes de hidratación)


```

## Sobre los archivos de la plantilla de Expo

Este proyecto se generó con create-expo-app, que trae una base con soporte de tema claro/oscuro, splash screen animado y navegación web ya resueltos. Durante el desarrollo se eliminaron los archivos que eran solo contenido de demostración y no tenían ninguna dependencia real en el proyecto: collapsible.tsx, web-badge.tsx, hint-row.tsx, external-link.tsx, imágenes de ejemplo sin uso, y el script reset-project.js.

Se conservaron, en cambio, los archivos que forman parte de la infraestructura real de la app y que otros componentes propios utilizan activamente:

**themed-text.tsx** / **themed-view.tsx**: toman sus colores de la paleta activa; los usa app-tabs.web.tsx y app/(tabs)/index.tsx.
**animated-icon.tsx** / **.web.tsx**: arman el splash animado que se ve al abrir la app.
**use-theme.ts** / **use-color-scheme.ts**: `use-theme` devuelve la paleta de la app (a través de `useAppColors`) a los componentes Themed\*, y `use-color-scheme` entrega el modo del sistema.

Antes de borrar cada archivo se verificó, con búsqueda global en el proyecto, que no tuviera ninguna referencia activa — la decisión de mantener los de arriba es intencional y no un descuido de limpieza.

## Conceptos aplicados

- **Componentes reutilizables y props**: Tag, Header, Chip, FiltersPanel, FormField, OptionPicker, PhotoPicker, CameraCapture, LocationButton y PetCard reciben sus datos exclusivamente por props; PetCard es el componente central que representa un elemento de la app (cumpliendo lo solicitado en la consigna, análogo a un MovieCard).
- **View, Text, Image, ScrollView**: usados en PetCard, las pantallas de formulario, FavoritesScreen y PetDetailScreen.
- **Datos tipados**: src/data/pets.ts define la interface Pet y las mascotas iniciales; el resto de los formularios usan interfaces propias para sus datos y errores.
- **Listas dinámicas**: .map() para renderizar los chips de filtro y de opciones, y .filter() para los favoritos y para el buscador.
- **FlatList con grilla**: HomeScreen y FavoritesScreen usan `FlatList` con `numColumns` (1, 2 o 3 columnas según el ancho de pantalla) y `ListEmptyComponent` para mostrar un mensaje cuando ninguna mascota coincide con los filtros.
- **Diseño responsive**: el hook `useLayout` usa `useWindowDimensions` para decidir cuántas columnas mostrar y qué márgenes aplicar. En pantallas anchas (web) los filtros pasan a una barra lateral; en el celular quedan arriba y se pliegan detrás de un botón "Filtros", con un contador de resultados, para que el teclado no tape la lista.
- **Estado local con `useState`**: HomeScreen guarda el texto de búsqueda y los filtros de tipo y tamaño, y se los pasa a `FiltersPanel` por props (_lifting state up_). Los inputs son controlados (`value` + `onChangeText`).
- **Funciones puras**: la lógica de filtrado, validación y armado de mascotas vive en `src/utils`, separada de las pantallas, para poder testearla de forma aislada.
- **Navegación**: Expo Router con grupo de pestañas (tabs) y rutas dinámicas: pet/[id] para el detalle y adopt/[id] para el formulario de adopción, y una pantalla de publicación, usando router.navigate(), router.back() y useLocalSearchParams().
- **Búsqueda de un elemento**: .find() para localizar la mascota correspondiente al id recibido por parámetro.
- **Estado global con Zustand**: cuatro stores (favoritos, mascotas, sesión y tema). Se consumen con selectores (`useFavoritesStore((state) => state.favoriteIds)`) desde las pantallas, sin pasar nada por props entre ellas. Publicar una mascota la agrega al store y aparece primera en el Inicio.
- **Modo claro/oscuro**: `constants/theme.ts` define dos paletas con las mismas claves (`AppPalettes`). El hook `useAppColors` entrega la del modo activo, y cada componente crea sus estilos dentro de una función `createStyles(colors)` para que los colores cambien con el modo. La preferencia del usuario (`"system"`, `"light"` o `"dark"`) vive en `theme-store.ts` (Zustand), y `useResolvedScheme` la combina con el modo del sistema. El botón `ThemeToggle` (sol/luna) la cambia.
- **Testing**: tests unitarios de funciones puras y tests de componentes con interacción (`render`, `fireEvent`), siguiendo el patrón AAA (Arrange, Act, Assert). Se usan funciones espía (`jest.fn()`) para verificar que un componente avisa a su padre por props, y `queryByText` / `getByText` según se quiera comprobar la ausencia o la presencia de un elemento. Los stores de Zustand se prueban reales, reiniciando su estado con `setState` antes de cada test.
- **Formularios controlados y validación**: los formularios validan con funciones puras que devuelven un objeto de errores por campo; `FormField` muestra el error y un contador de caracteres con máximo (`maxLength`), y `OptionPicker` resuelve los campos de opción única.
- **Mocks en tests**: se reemplazan `useRouter` y `useLocalSearchParams` de Expo Router por versiones simuladas para probar la pantalla de forma aislada.
- **APIs nativas**: galería (`expo-image-picker`), cámara (`expo-camera` con `CameraView`, `useCameraPermissions` y `takePictureAsync`) y ubicación (`expo-location`, con geocodificación inversa para obtener la ciudad). Cada una pide su permiso y, si el usuario lo rechaza, ofrece ir a los ajustes.

## Features

| #   | Features                                                    | Estado          |
| --- | ----------------------------------------------------------- | --------------- |
| 1   | Consultar el listado de mascotas disponibles                | ✅ Implementada |
| 2   | Consultar el detalle de una mascota                         | ✅ Implementada |
| 3   | Consultar mascotas favoritas                                | ✅ Implementada |
| 4   | Marcar/desmarcar una mascota como favorita                  | ✅ Implementada |
| 5   | Filtrar mascotas por tipo y tamaño                          | ✅ Implementada |
| 6   | Buscar una mascota por nombre                               | ✅ Implementada |
| 7   | Solicitar la adopción de una mascota                        | ✅ Implementada |
| 8   | Modo oscuro/claro en componentes propios                    | ✅ Implementada |
| 9   | Ingresar con una cuenta (simulada)                          | ✅ Implementada |
| 10  | Publicar una mascota en adopción (foto, cámara y ubicación) | ✅ Implementada |

> **Nota** esta no es la versión final del proyecto. Los datos de las mascotas son locales (`src/data/pets.ts`) y no hay servidor:
>
> - La **cuenta es simulada**: pide nombre y email, los valida y guarda la sesión solo mientras la app está abierta.
> - Las **mascotas publicadas, los favoritos, la sesión y la preferencia de tema viven en memoria**, y se pierden al cerrar la app.
> - La **solicitud de adopción es simulada**: valida los datos y muestra una confirmación, pero no se envía a ningún servidor.
