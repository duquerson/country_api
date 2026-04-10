<script setup lang="ts">
import { useTheme } from '@presentation/composables/useTheme';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';

const { isDark, toggle } = useTheme();
</script>

<template>
  <header class="bg-surface shadow-md px-6 sm:px-20 h-20 flex items-center justify-between z-10 relative">
    <a href="/" class="text-xl sm:text-2xl font-extrabold text-text no-underline hover:-translate-y-0.5 transition-transform">
      Where in the world?
    </a>

    <button
      class="flex items-center gap-2 font-semibold text-sm text-text bg-transparent border-none cursor-pointer hover:text-muted transition-colors"
      @click="toggle"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <MoonIcon v-if="!isDark" class="w-5 h-5 text-text" aria-hidden="true" />
      <SunIcon v-else class="w-5 h-5 text-text" aria-hidden="true" />
      <span class="hidden sm:inline">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
      <span class="sm:hidden">{{ isDark ? 'Light' : 'Dark' }}</span>
    </button>
  </header>
</template>