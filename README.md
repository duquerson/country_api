# REST Countries API - Where in the world?

![Astro][astro-badge] ![Vue][vue-badge] ![Tailwind][tailwind-badge] ![TypeScript][ts-badge]

Aplicación web para explorar países del mundo usando la REST Countries API.

## ✨ Features

- 🔍 Búsqueda de países por nombre
- 🌍 Filtrado por región (Africa, Americas, Asia, Europe, Oceania)
- 📄 Página de detalles por país
- 🌐 Países fronterizos
- 🌓 Modo claro/oscuro
- ♿ Accesibilidad completa (ARIA, keyboard navigation)
- 📱 Diseño responsive
- ⚡ View Transitions para navegación fluida
- 💾 Caché en memoria para rendimiento
- 🧪 Suite de tests completa

## 🏗️ Arquitectura

```
src/
├── actions/          # Astro server actions
├── core/             # Domain layer (DDD)
│   ├── domain/       # Entities, schemas, types
│   ├── interfaces/   # Repository ports
│   ├── services/    # Error handling
│   └── use-cases/   # Business logic
├── infrastructure/  # Adapters layer
│   ├── cache/       # API caching
│   ├── config/      # Configuration
│   ├── http/        # HTTP client
│   └── repositories/# Repository implementation
├── presentation/    # UI layer
│   ├── components/  # Vue components
│   └── composables/ # Vue composables
├── pages/           # Astro pages
├── layouts/         # Astro layouts
└── tests/           # Unit & E2E tests
```

## 🛠️ Tech Stack

- **Framework**: Astro 6 (SSR)
- **UI**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS v4
- **Types**: TypeScript 5.6
- **Validation**: Zod 4
- **Testing**: Vitest + Playwright

## 📦 Scripts

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build de producción
npm run test         # Tests unitarios
npm run test:run     # Tests unitarios (single run)
npm run e2e          # Tests E2E con Playwright
npm run typecheck    # Verificación de tipos
```

## 🧪 Testing

- **Unit Tests**: 80 tests con Vitest
- **E2E Tests**: 11 tests con Playwright

## 🔐 Seguridad

- Validación de input con Zod schemas
- Sanitización de búsquedas
- Timeout y retry en requests HTTP
- CSP headers y security meta tags
- Validación de URLs externas

## 📄 Licencia

MIT

## 👤 Autor

Duquerson - [GitHub](https://github.com/duquerson) - [Frontend Mentor](https://www.frontendmentor.io/profile/yeyosoto)

---

[astro-badge]: https://img.shields.io/badge/Astro-6.1.3-FF6D00?style=flat&logo=astro
[vue-badge]: https://img.shields.io/badge/Vue-3.5.25-42B883?style=flat&logo=vue.js
[tailwind-badge]: https://img.shields.io/badge/Tailwind-4.2.2-06B6D1?style=flat&logo=tailwind-css
[ts-badge]: https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat&logo=typescript
