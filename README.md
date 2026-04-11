# REST Countries API - Where in the world?


![Astro][astro-badge] ![Vue][vue-badge] ![Tailwind][tailwind-badge] ![TypeScript][ts-badge]

🌍 **Live Demo:** [https://country-api-eight-wheat.vercel.app](https://country-api-eight-wheat.vercel.app)

Aplicación web para explorar países del mundo usando la REST Countries API, construida con una arquitectura Clean simplificada y optimizada para SSR.


## ✨ Features

- 🔍 Búsqueda de países por nombre y filtrado por región (combinados)
- 📄 Página de detalles por país con hidratación de países fronterizos
- 🌓 Modo claro/oscuro con detección de sistema
- ♿ Accesibilidad completa (ARIA, navegación por teclado)
- 📱 Diseño responsive "Mobile First"
- ⚡ SSR (Server-Side Rendering) para carga inicial instantánea y SEO
- 💾 Caché inteligente en infraestructura para rendimiento óptimo
- 🧪 Suite de tests automatizada (Unit & E2E)

## 🏗️ Arquitectura (Clean Architecture Simplificada)

La arquitectura ha sido refinada para evitar el boilerplate excesivo y centralizar la lógica de negocio:

```
src/
├── core/             # Core Domain (SSOT)
│   ├── domain/       # Types, Schemas (Zod) y Errors centralizados
│   ├── interfaces/   # Ports (Repository definitions)
│   └── use-cases/    # Unified Business Logic (e.g. GetCountries)
├── infrastructure/   # Data Adapters
│   ├── cache/        # In-memory optimization
│   ├── http/         # Core fetch con Retry & Timeout logic
│   └── repositories/ # Implementaciones concretas del API
├── presentation/    # Presentation Layer
│   ├── components/   # Vue components (Atomic design-ish)
│   └── composables/  # Hooks reactivos (useAsync generic wrapper)
├── actions/          # Astro / Server Actions (Bridges)
├── pages/            # Astro Routes (SSR Entry points)
└── layouts/          # Base layouts
```

### Principios de Refactorización:
- **Centralización**: Tipos, esquemas de validación y manejo de errores consolidados en `src/core/domain`.
- **Simplificación**: Unificación de casos de uso (GetAll, Search, Filter) en un único selector de lógica.
- **Reducción de Boilerplate**: Uso de `useAsync` genérico para manejar estados de carga y error en la UI.
- **Optimización SSR**: Los datos iniciales se recuperan en el servidor (`index.astro`) eliminando el "layout shift" inicial.

## 🛠️ Tech Stack

- **Framework**: Astro 6 (SSR Mode)
- **UI**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS v4
- **Validation**: Zod (Centralizado)
- **Testing**: Vitest + Playwright

## 📦 Scripts

```bash
pnpm dev          # Desarrollo
pnpm build        # Build para Vercel/Node
pnpm test         # Tests unitarios (Vitest)
pnpm e2e          # Tests de integración (Playwright)
```

## 📄 Licencia

MIT

---

[astro-badge]: https://img.shields.io/badge/Astro-6.1.3-FF6D00?style=flat&logo=astro
[vue-badge]: https://img.shields.io/badge/Vue-3.5.25-42B883?style=flat&logo=vue.js
[tailwind-badge]: https://img.shields.io/badge/Tailwind-4.2.2-06B6D1?style=flat&logo=tailwind-css
[ts-badge]: https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat&logo=typescript
