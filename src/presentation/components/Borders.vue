<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import { useCountryDetail } from '../composables/useCountries';
import type { CountrySummary } from '../../core/domain/types';

const props = defineProps<{
  borders: readonly string[];
}>();

const { fetchBorders } = useCountryDetail();
const borderCountries = ref<CountrySummary[]>([]);
const loading = ref(true);

onMounted(async () => {
  if (props.borders && props.borders.length > 0) {
    borderCountries.value = await fetchBorders([...props.borders]);
  }
  loading.value = false;
});

const handle_click = (code: string) => {
  window.location.href = `/detail/${code.toLowerCase()}`;
};
</script>

<template>
  <div class="flex flex-wrap gap-2 sm:gap-3">
    <div v-if="loading" class="flex gap-2">
       <div v-for="i in 3" :key="i" class="w-20 h-8 bg-muted/20 animate-pulse rounded"></div>
    </div>
    <button
      v-for="country in borderCountries"
      :key="country.cca3"
      @click="() => handle_click(country.cca3)"
      class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-surface border border-muted/10 rounded shadow-sm text-xs sm:text-[13px] font-medium text-text cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-muted/30 focus:outline-none focus:ring-2 focus:ring-muted/50 group"
    >
      <span class="tracking-normal">{{ country.name.common }}</span>
      <ArrowRightIcon class="w-3.5 h-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </div>
</template>