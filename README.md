# REST Countries API - Where in the world?

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

![Astro][astro-badge] ![Vue][vue-badge] ![Tailwind][tailwind-badge] ![TypeScript][ts-badge]

🌍 **Live Demo:** [https://country-api-eight-wheat.vercel.app](https://country-api-eight-wheat.vercel.app)

## 📋 Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Architecture (Clean Architecture)](#architecture-clean-architecture)
- [Author](#author)

## Overview

### The challenge

Your challenge is to integrate with the [REST Countries API](https://restcountries.com) to pull country data and display it like in the designs.

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an input field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

| Desktop Preview | Mobile Preview |
| :---: | :---: |
| ![Desktop](./design/desktop-preview.jpg) | ![Mobile](./design/mobile-preview.jpg) |

*(Note: Add your actual screenshots if available)*

### Links

- Solution URL: [GitHub Repository](https://github.com/duquerson/country_api)
- Live Site URL: [Vercel Deployment](https://country-api-eight-wheat.vercel.app)

## My process

### Built with

- **Astro 6** - Framework for content-driven websites with Islands Architecture.
- **Vue 3** (Composition API) - For interactive components.
- **Tailwind CSS v4** - Modern CSS utility framework.
- **Zod** - Robust schema validation.
- **Flexbox & CSS Grid** - Layout systems.
- **Mobile-first workflow** - Responsive design strategy.
- **SSR (Server-Side Rendering)** - For instant load times and optimal SEO.

### Architecture (Clean Architecture)

The project follows a simplified **Clean Architecture** pattern to ensure maintainability, testability, and scalability:

```
src/
├── core/             # Core Domain (SSOT)
│   ├── domain/       # Types, Schemas (Zod) and Centralized Errors
│   ├── interfaces/   # Ports (Repository definitions)
│   └── use-cases/    # Unified Business Logic (e.g. GetCountries)
├── infrastructure/   # Data Adapters
│   ├── cache/        # In-memory optimization
│   ├── http/         # Core fetch with Retry & Timeout logic
│   └── repositories/ # Concrete API implementations
├── presentation/    # Presentation Layer
│   ├── components/   # Vue components
│   └── composables/  # Generic reactive hooks (useAsync)
├── actions/          # Astro Actions (Bridges)
├── pages/            # Astro Routes (SSR Entry points)
└── layouts/          # Base layouts
```

### Key Optimizations:
- **Centralization**: Types and validation schemas consolidated in `src/core/domain`.
- **SSR Integration**: Initial data fetching happens on the server, eliminating layout shifts and improving UX.
- **Intelligent Caching**: Infrastructure-level caching to reduce API calls and improve performance.
- **Full Accessibility**: ARIA attributes and keyboard navigation fully implemented.

## 📦 Scripts

```bash
pnpm dev          # Run development server
pnpm build        # Build for production (Vercel/Node)
pnpm test         # Run unit tests (Vitest)
pnpm e2e          # Run E2E tests (Playwright)
```

## Author

- GitHub - [Duquerson](https://github.com/duquerson)
- Frontend Mentor - [@Duquerson](https://www.frontendmentor.io/profile/Duquerson)
- LinkedIn - [Duquerson](https://www.linkedin.com/in/duquerson)

## Acknowledgments

It was fun to build it! 🚀 If you like the code, feel free to follow me. 👋

---

[astro-badge]: https://img.shields.io/badge/Astro-6.1.3-FF6D00?style=flat&logo=astro
[vue-badge]: https://img.shields.io/badge/Vue-3.5.25-42B883?style=flat&logo=vue.js
[tailwind-badge]: https://img.shields.io/badge/Tailwind-4.2.2-06B6D1?style=flat&logo=tailwind-css
[ts-badge]: https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat&logo=typescript
