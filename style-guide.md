# 🌍 "Where in the World?" — Guía de Diseño
### Astro + Vue 3 + Tailwind CSS v4

---

## 1. ¿Qué cambia en Tailwind v4?

> ⚠️ Tailwind v4 ya **no usa** `tailwind.config.js`. Toda la configuración va en tu archivo CSS con la directiva `@theme`.

| Tailwind v3                  | Tailwind v4                     |
|------------------------------|---------------------------------|
| `tailwind.config.js`         | ❌ Eliminado                    |
| `@tailwind base/utilities`   | `@import "tailwindcss"`         |
| `theme.extend.colors`        | `@theme { --color-*: ... }`     |
| Variante `dark:` con clase   | Variante `dark:` CSS nativa     |

---

## 2. Instalación

```bash
# En tu proyecto Astro
npm install tailwindcss @tailwindcss/vite
```

En `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

---

## 3. Configuración del Tema (`global.css`)

En Tailwind v4 defines tus colores y tokens aquí. Importa este archivo en tu `Layout.astro`.

```css
/* src/styles/global.css */
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

@theme {
  /* ── Colores del tema ── */
  --color-surface: #FFFFFF;
  --color-bg:      #FAFAFA;
  --color-text:    #111517;
  --color-muted:   #858585;

  /* ── Fuente ── */
  --font-sans: 'Nunito Sans', sans-serif;
}

/* Modo oscuro: se activa con data-theme="dark" en <html> */
[data-theme="dark"] {
  --color-surface: #2B3945;
  --color-bg:      #202C37;
  --color-text:    #FFFFFF;
  --color-muted:   #FFFFFF;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  transition: background-color 0.2s, color 0.2s;
}
```

> 💡 Los colores definidos en `@theme` con el prefijo `--color-*` quedan disponibles como clases de Tailwind automáticamente. Por ejemplo: `bg-surface`, `text-text`, `text-muted`.

---

## 4. Layout General

### `Layout.astro`
```astro
---
import '../styles/global.css'
---
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Where in the World?</title>
  </head>
  <body class="bg-bg min-h-screen">
    <slot />
  </body>
</html>
```

### `index.astro`
```astro
---
import Layout from '../layouts/Layout.astro'
import App from '../components/App.vue'
---
<Layout>
  <App client:load />
</Layout>
```

> 💡 `client:load` le dice a Astro que este componente Vue debe ser **interactivo** en el navegador (necesario para el toggle, búsqueda, etc.).

---

## 5. Componentes Vue

### 5.1 `App.vue` — Componente raíz

```vue
<template>
  <div>
    <AppHeader :isDark="isDark" @toggle="toggleTheme" />

    <main class="max-w-[1440px] mx-auto px-20 py-12">
      <!-- Barra de controles -->
      <div class="flex justify-between items-center mb-12 flex-wrap gap-4">
        <SearchBar @search="q => query = q" />
        <FilterDropdown @filter="r => region = r" />
      </div>

      <!-- Grid de países -->
      <div class="grid grid-cols-4 gap-16 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        <CountryCard
          v-for="country in filtered"
          :key="country.cca3"
          :country="country"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AppHeader      from './AppHeader.vue'
import SearchBar      from './SearchBar.vue'
import FilterDropdown from './FilterDropdown.vue'
import CountryCard    from './CountryCard.vue'

const countries = ref([])
const query     = ref('')
const region    = ref('')
const isDark    = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
}

// Cambia el atributo en <html> para activar los colores oscuros
watch(isDark, val => {
  document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
})

// Filtra países según búsqueda y región
const filtered = computed(() => {
  return countries.value
    .filter(c => c.name.common.toLowerCase().includes(query.value.toLowerCase()))
    .filter(c => region.value ? c.region === region.value : true)
})

onMounted(async () => {
  const res  = await fetch('https://restcountries.com/v3.1/all')
  const data = await res.json()
  countries.value = data
})
</script>
```

---

### 5.2 `AppHeader.vue`

```vue
<template>
  <header class="bg-surface shadow-md px-20 h-20 flex items-center justify-between">
    <span class="text-2xl font-extrabold text-text">
      Where in the world?
    </span>

    <button
      class="flex items-center gap-2 font-semibold text-sm text-text bg-transparent border-none cursor-pointer"
      @click="$emit('toggle')"
    >
      🌙 {{ isDark ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </header>
</template>

<script setup>
defineProps({ isDark: Boolean })
defineEmits(['toggle'])
</script>
```

**Clases clave:**
| Clase Tailwind  | Qué hace                              |
|-----------------|---------------------------------------|
| `bg-surface`    | Fondo con tu color `--color-surface`  |
| `shadow-md`     | Sombra sutil bajo el header           |
| `h-20`          | Altura de 80px                        |
| `font-extrabold`| font-weight: 800                      |
| `text-text`     | Color `--color-text`                  |

---

### 5.3 `SearchBar.vue`

```vue
<template>
  <div class="relative w-[480px] max-w-full">
    <!-- Ícono de lupa -->
    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-muted text-base">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search for a country..."
      @input="$emit('search', $event.target.value)"
      class="
        w-full h-14 pl-16 pr-6
        bg-surface text-text text-sm font-light
        rounded shadow-md outline-none
        placeholder:text-muted
      "
    />
  </div>
</template>

<script setup>
defineEmits(['search'])
</script>
```

**Clases clave:**
| Clase Tailwind           | Qué hace                         |
|--------------------------|----------------------------------|
| `relative`               | Para posicionar el ícono dentro  |
| `absolute left-6`        | Ícono pegado a la izquierda      |
| `-translate-y-1/2`       | Centra el ícono verticalmente    |
| `h-14`                   | Altura de 56px                   |
| `pl-16`                  | Padding izquierdo para el ícono  |
| `rounded`                | border-radius: 5px               |
| `shadow-md`              | Sombra del input                 |
| `placeholder:text-muted` | Color del placeholder            |

---

### 5.4 `FilterDropdown.vue`

```vue
<template>
  <div class="relative w-48">
    <!-- Botón principal -->
    <button
      class="
        w-full h-14 px-6
        bg-surface text-text text-sm font-semibold
        rounded shadow-md border-none cursor-pointer
        flex items-center justify-between
      "
      @click="open = !open"
    >
      {{ selected || 'Filter by Region' }}
      <span>▾</span>
    </button>

    <!-- Lista desplegable -->
    <ul
      v-if="open"
      class="
        absolute top-[calc(100%+4px)] left-0 w-full
        bg-surface rounded shadow-md
        py-3 z-10 list-none m-0
      "
    >
      <li
        v-for="r in regions"
        :key="r"
        class="px-6 py-1 text-sm text-text cursor-pointer hover:bg-black/5"
        @click="select(r)"
      >
        {{ r }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const regions  = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
const selected = ref('')
const open     = ref(false)
const emit     = defineEmits(['filter'])

function select(region) {
  selected.value = region
  open.value     = false
  emit('filter', region)
}
</script>
```

---

### 5.5 `CountryCard.vue`

```vue
<template>
  <article
    class="
      bg-surface rounded overflow-hidden
      shadow-[0_0_7px_2px_rgba(0,0,0,0.1)]
      cursor-pointer
      transition-transform duration-200 hover:-translate-y-1
    "
  >
    <!-- Bandera -->
    <img
      :src="country.flags.png"
      :alt="`Bandera de ${country.name.common}`"
      class="w-full h-40 object-cover block"
    />

    <!-- Información -->
    <div class="px-6 pt-6 pb-10">
      <h2 class="text-lg font-extrabold text-text mb-4">
        {{ country.name.common }}
      </h2>

      <p class="text-sm text-text mb-1">
        <strong class="font-semibold">Population:</strong>
        {{ country.population.toLocaleString('en-US') }}
      </p>
      <p class="text-sm text-text mb-1">
        <strong class="font-semibold">Region:</strong>
        {{ country.region }}
      </p>
      <p class="text-sm text-text">
        <strong class="font-semibold">Capital:</strong>
        {{ country.capital?.[0] }}
      </p>
    </div>
  </article>
</template>

<script setup>
defineProps({ country: Object })
</script>
```

**Clases clave:**
| Clase Tailwind                          | Qué hace                           |
|-----------------------------------------|------------------------------------|
| `overflow-hidden`                       | La imagen respeta el border-radius |
| `shadow-[0_0_7px_2px_rgba(0,0,0,0.1)]` | Sombra personalizada (valor libre) |
| `hover:-translate-y-1`                  | Sube 4px al hacer hover            |
| `transition-transform duration-200`     | Animación suave del hover          |
| `h-40`                                  | Altura de imagen: 160px            |
| `object-cover`                          | La imagen llena sin deformarse     |
| `pb-10`                                 | Padding inferior generoso (40px)   |

---

## 6. Estructura de Archivos

```
src/
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
├── components/
│   ├── App.vue             ← Lógica principal + fetch API
│   ├── AppHeader.vue
│   ├── SearchBar.vue
│   ├── FilterDropdown.vue
│   └── CountryCard.vue
└── styles/
    └── global.css          ← @import tailwindcss + @theme
```

---

## 7. Checklist de Implementación

- [ ] Instalar `tailwindcss` y `@tailwindcss/vite`
- [ ] Configurar plugin en `astro.config.mjs`
- [ ] Crear `global.css` con `@import "tailwindcss"` y `@theme`
- [ ] Importar `global.css` en `Layout.astro`
- [ ] `App.vue` con fetch, filtros y toggle de tema
- [ ] `AppHeader.vue` con botón Dark/Light Mode
- [ ] `SearchBar.vue` con ícono posicionado
- [ ] `FilterDropdown.vue` funcional
- [ ] `CountryCard.vue` con hover animado
- [ ] Grid responsive (4 → 2 → 1 columnas)
- [ ] Tema oscuro activado con `data-theme="dark"` en `<html>`
