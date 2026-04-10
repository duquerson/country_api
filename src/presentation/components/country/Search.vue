<script setup lang="ts">
import { ref, watch } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import Input from '@presentation/components/ui/Input.vue';
import { CONFIG } from '@core/constants/config';
import { UI_LABELS } from '@core/constants/uiLabels';

const emit = defineEmits<{
  search: [query: string];
}>();

const value = ref('');

const sanitizeQuery = (query: string): string => {
  return query.trim().slice(0, CONFIG.MAX_QUERY_LENGTH).toLowerCase();
};

const emitSearch = (query: string) => {
  const sanitized = sanitizeQuery(query);
  emit('search', sanitized);
};

let timeout: ReturnType<typeof setTimeout> | null = null;

watch(value, (newValue) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    emitSearch(newValue);
  }, CONFIG.SEARCH_DEBOUNCE_MS);
});
</script>

<template>
  <div class="w-full max-w-(--size-search)">
    <Input
      v-model="value"
      id="search"
      :label="UI_LABELS.SEARCH_PLACEHOLDER"
      :placeholder="UI_LABELS.SEARCH_PLACEHOLDER"
      has-icon
      @submit="() => emitSearch(value)"
    >
      <template #icon>
        <MagnifyingGlassIcon class="w-5 h-5" />
      </template>
    </Input>
  </div>
</template>
