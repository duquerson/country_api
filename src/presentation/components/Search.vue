<script setup lang="ts">
import { ref, watch } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { SEARCH_DEBOUNCE_MS } from '../../infrastructure/config/http';

const emit = defineEmits<{
  search: [query: string];
}>();

const value = ref('');

const MAX_QUERY_LENGTH = 100;

const sanitizeQuery = (query: string): string => {
  const trimmed = query.trim().slice(0, MAX_QUERY_LENGTH).toLowerCase();
  return trimmed;
};

const emitSearch = (query: string) => {
  const sanitized = sanitizeQuery(query);
  if (sanitized.length > 0) {
    emit('search', sanitized);
  }
};

let timeout: ReturnType<typeof setTimeout> | null = null;

watch(value, (newValue) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    emitSearch(newValue);
  }, SEARCH_DEBOUNCE_MS);
});
</script>

<template>
  <div class="relative w-full max-w-[480px]">
    <span class="absolute left-6 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
      <MagnifyingGlassIcon class="w-5 h-5" />
    </span>

    <label for="search" class="sr-only">Search for a country</label>
    <input
      v-model="value"
      type="search"
      name="search"
      id="search"
      placeholder="Search for a country..."
      aria-label="Search for a country by name"
      @keyup.enter="() => emitSearch(value)"
      class="w-full h-14 pl-16 pr-6 bg-surface text-text text-sm rounded shadow-md outline-none border border-transparent focus:border-muted/30 focus:shadow-lg transition-all placeholder:text-muted"
    />
  </div>
</template>
