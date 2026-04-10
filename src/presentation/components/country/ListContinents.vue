<script setup lang="ts">
import { ref } from 'vue';
import { CONFIG } from '@core/constants/config';
import { UI_LABELS } from '@core/constants/uiLabels';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  select: [region: string];
}>();

const continents = CONFIG.REGIONS;
const listOpen = ref(false);
const select = ref('');

const toggle = () => {
  listOpen.value = !listOpen.value;
};

const selectContinent = (continent: string) => {
  select.value = continent;
  emit('select', continent);
  listOpen.value = false;
};

const clearFilter = () => {
  select.value = '';
  emit('select', '');
  listOpen.value = false;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!listOpen.value) return;
  
  if (e.key === 'Escape') {
    listOpen.value = false;
    e.stopPropagation();
  }
};
</script>

<template>
  <div class="relative w-48 z-10">
    <button
      type="button"
      class="w-full h-14 px-6 bg-surface text-text text-sm font-semibold rounded shadow-md border-none cursor-pointer flex items-center justify-between transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-muted/50"
      @click="toggle"
      :aria-expanded="listOpen"
      aria-haspopup="listbox"
      aria-label="Filter countries by region"
    >
      <span>{{ select || UI_LABELS.FILTER_BY_REGION }}</span>
      <ChevronDownIcon 
        class="w-4 h-4 text-text transition-transform duration-300"
        :class="{ 'rotate-180': listOpen }"
        aria-hidden="true"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul
        v-if="listOpen"
        class="absolute top-[calc(100%+4px)] left-0 w-full bg-surface rounded shadow-md py-3 list-none m-0 max-h-60 overflow-auto"
        role="listbox"
        aria-label="Select a region"
        @keydown="handleKeyDown"
      >
        <li v-if="select" class="px-6 py-2 text-sm text-muted font-semibold border-b border-muted/10 mb-2">
          <button 
            type="button"
            @click="clearFilter" 
            class="flex items-center gap-2 hover:text-text cursor-pointer w-full text-left bg-transparent border-none p-0"
          >
            <XMarkIcon class="w-4 h-4" aria-hidden="true" />
            <span>{{ UI_LABELS.CLEAR_FILTER }}</span>
          </button>
        </li>
        <li 
          v-for="continent in continents" 
          :key="continent"
          class="px-6 py-2 text-sm text-text cursor-pointer hover:bg-muted/10 transition-colors"
          :class="{ 'bg-muted/10 font-bold': select === continent }"
          role="option"
          :aria-selected="select === continent"
          @click="selectContinent(continent)"
          @keydown.enter.prevent="selectContinent(continent)"
          @keydown.space.prevent="selectContinent(continent)"
          tabindex="0"
        >
          {{ continent }}
        </li>
      </ul>
    </Transition>
  </div>
</template>