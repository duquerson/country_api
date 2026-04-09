<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  borders: readonly string[];
}>();

const handle_click = (code: string) => {
  window.location.href = `/detail/${code.toLowerCase()}`;
};
</script>

<template>
  <div class="flex flex-wrap gap-2 sm:gap-3">
    <button
      v-for="country in borders"
      :key="country"
      @click="() => handle_click(country)"
      class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-surface border border-muted/10 rounded shadow-sm text-xs sm:text-[13px] font-medium text-text cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-muted/30 focus:outline-none focus:ring-2 focus:ring-muted/50 group"
    >
      <span class="tracking-widest">{{ country }}</span>
      <ArrowRightIcon class="w-3.5 h-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </div>
</template>