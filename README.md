# REST Countries API - Where in the world?

Solution to the [REST Countries API challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

![Astro][astro-badge] ![Vue][vue-badge] ![Tailwind][tailwind-badge] ![TypeScript][ts-badge]

Live Demo: https://country-api-eight-wheat.vercel.app

## Overview

Users can search countries, filter by region, view detail pages and toggle dark/light mode.

## Built with

- **Astro 7** - SSR + Islands Architecture
- **Vue 3** (Composition API) - Interactive components
- **Tailwind CSS v4** - Utility CSS
- **Zod v4** - Schema validation
- **TypeScript 5.9**

> **API:** Migrated from REST Countries v3.1 (retired) to **v5** (`api.restcountries.com/countries/v5`).
> The `RESTCOUNTRIES_API_KEY` is used server-side only via Astro Actions — never exposed to the browser.

## Setup

1. Copy `.env.example` to `.env` and fill in `RESTCOUNTRIES_API_KEY`
   (Get a free key at https://restcountries.com/sign-up)
2. `pnpm install`
3. `pnpm run dev`

## Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Development server |
| `pnpm run build` | Production build |
| `pnpm run test:run` | Unit tests (Vitest 5, 52 tests) |
| `pnpm run e2e` | E2E tests (Playwright) |
| `pnpm run typecheck` | TypeScript check |
| `pnpm run lint` | ESLint |

## Architecture (Clean Architecture)

```
src/
+-- core/             # Domain: Types, Zod v4 Schemas, Errors, Use Cases
+-- infrastructure/   # HTTP (auth header), Cache, Repositories (v5)
+-- presentation/     # Vue components and composables
+-- actions/          # Astro Actions (API key stays server-side)
+-- pages/            # SSR routes with visible error propagation
```

## Author

- GitHub: https://github.com/duquerson
- Frontend Mentor: https://www.frontendmentor.io/profile/Duquerson
- LinkedIn: https://www.linkedin.com/in/duquerson

[astro-badge]: https://img.shields.io/badge/Astro-7.4.1-FF6D00?style=flat&logo=astro
[vue-badge]: https://img.shields.io/badge/Vue-3.5.44-42B883?style=flat&logo=vue.js
[tailwind-badge]: https://img.shields.io/badge/Tailwind-4.3.3-06B6D1?style=flat&logo=tailwind-css
[ts-badge]: https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript