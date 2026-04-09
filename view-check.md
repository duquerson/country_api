# Vista General del Proyecto Country API

## Estructura del Proyecto

El proyecto sigue una arquitectura hexagonal/limpia organizada por capas:

```
src/
├── core/                     # Lógica de negocio y dominio
│   ├── domain/               # Entidades y interfaces del dominio
│   └── services/             # Servicios de aplicación
├── application/              # Casos de uso (use cases)
├── infrastructure/           # Implementaciones de infraestructura
│   ├── http/                 # Cliente HTTP y manejo de red
│   └── repositories/         # Implementaciones de repositorios
├── presentation/             # Capa de presentación (UI y lógica de vista)
│   ├── components/           # Componentes Vue reutilizables
│   └── composables/          # Lógica de presentación y estado
├── pages/                    # Páginas Astro (rutas)
├── layouts/                  # Layouts compartidos
└── styles/                   # Estilos globales y configuración de tema
```

## Partes Clave de la Lógica de Presentación

### 1. **Astro Pages** (`src/pages/`)
Puntos de entrada que definen las rutas y ensamblan los componentes:
- `index.astro`: Página principal con lista de países
- `detail/[code].astro`: Página de detalle para un país específico
- `404.astro`: Página de error para rutas no encontradas

### 2. **Layouts** (`src/layouts/`)
- `BaseLayout.astro`: Layout base que proporciona estructura común (encabezado, estilo global)

### 3. **Componentes de Presentación** (`src/presentation/components/`)
Componentes Vue reutilizables que manejan la UI y interacción de usuario:
- `Header.vue`: Barra de navegación con toggle de tema claro/oscuro
- `ListSearch.vue`: Contenedor que combina barra de búsqueda y filtro de región
- `Search.vue`: Campo de entrada de búsqueda con debounce
- `ListContinents.vue`: Dropdown para filtrar por continente/región
- `CountryBody.vue`: Componente principal que gestiona obtención y visualización de datos de países
- `Card.vue`: Tarjeta individual que muestra información resumida de un país
- `CountryDetail.vue`: Vista detallada de un país específico
- `ImageLazy.vue`: Componente para carga diferida de imágenes
- `Page404.vue`: Contenido de la página de error 404
- `Borders.vue`: Muestra países limítrofes

### 4. **Composables de Lógica de Presentación** (`src/presentation/composables/`)
Funciones reutilizables que encapsulan lógica de presentación y estado:
- `useCountries.ts`: 
  - Maneja obtención, búsqueda y filtrado de lista de países
  - Gestiona estados de carga, error y datos
  - Interactúa con casos de uso a través del contenedor de inyección de dependencias
- `useTheme.ts`: 
  - Maneja el estado del tema (claro/oscuro)
  - Proporciona función para alternar tema
  - Sincroniza con atributo `data-theme` en el elemento HTML

### 5. **Integración con Capa de Aplicación**
La capa de presentación se comunica con la capa de aplicación a través de:
- **Contenedor de Inyección de Dependencias** (`src/composition-root.ts`): Prove acceso a casos de uso
- **Casos de Uso** (`src/application/use-cases/`): 
  - `GetAllCountries`: Obtiene lista completa de países
  - `SearchCountries`: Busca países por nombre
  - `FilterByRegion`: Filtra países por región
  - `GetCountryByCode`: Obtiene detalle de un país específico
  - `GetBorderCountries`: Obtiene países limítrofes

## Flujo de Datos en la Presentación

1. **Inicialización**:
   - Las páginas Astro importan y renderizan componentes Vue
   - Los componentes usan composables para obtener lógica de presentación

2. **Obtención de Datos**:
   - Los composables llaman a los casos de uso a través del contenedor de inyección
   - Los casos de uso interactúan con repositorios de infraestructura
   - Los repositorios hacen llamadas HTTP a la API externa (restcountries.com)

3. **Actualización de Estado**:
   - Los composables actualizan sus estados reactivos (ref) con los datos obtenidos
   - Vue reacciona automáticamente y actualiza el DOM

4. **Interacción de Usuario**:
   - Eventos de entrada (búsqueda, cambio de filtro, toggle de tema) activan funciones en los composables
   - Los composables actualizan estado y desencadenan nuevas obtenciones de datos cuando es apropiado
   - Los indicadores de carga y manejo de errores se actualizan en la UI

## Responsabilidades por Componente

- **Header.vue**: 
  - Responsabilidad única: Manejo de toggle de tema y visualización del título
  - No contiene lógica de obtención de datos

- **ListSearch.vue**: 
  - Orquestador: Combina componentes de búsqueda y filtro
  - Maneja propagación de eventos desde hijos al padre
  - No contiene lógica de negocio

- **CountryBody.vue**: 
  - Lógica de presentación: Decide qué datos obtener basado en consultas/filtrado
  - Maneja estados de carga, error y resultados vacíos
  - Orquestador: Renderiza lista de tarjetas de país
  - Contiene lógica de presentación pero delega obtención de datos a composables

- **Card.vue**: 
  - Responsabilidad única: Visualización de datos de un país individual
  - Recibe datos como prop y los muestra

- **CountryDetail.vue**: 
  - Responsabilidad única: Visualización detallada de un país específico
  - Recibe código de país como prop y obtiene sus datos

Esta separación de responsabilidades sigue los principios de arquitectura limpia, donde la capa de presentación se ocupa de cómo se muestra la información, mientras que las capas más profundas se ocupan de qué información se muestra y cómo se obtiene.