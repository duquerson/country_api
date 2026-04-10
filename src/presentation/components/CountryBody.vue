<script setup lang="ts">
import { watch, onMounted, computed } from 'vue';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import Card from './Card.vue';
import Button from './Button.vue';
import { useCountries } from '../composables/useCountries';
import { getFriendlyMessage } from '../../core/domain/errors';
import type { CountrySummary } from '../../core/domain/types';

const props = defineProps<{
  query: string;
  region: string;
  initialData?: CountrySummary[];
}>();

const { countries, loading, error, fetch, setCountries } = useCountries();

const numElements = 12;
const elements = Array.from({ length: numElements }, (_, i) => i + 1);

const hasError = computed(() => !!error.value);
const hasNoResults = computed(() => !loading.value && (countries.value?.length === 0) && !error.value);
const errorMessage = computed(() => error.value ? getFriendlyMessage(error.value) : '');

const fetchCountries = () => {
  fetch({ query: props.query, region: props.region });
};

watch(
  () => ({ query: props.query, region: props.region }),
  () => fetchCountries()
);

onMounted(() => {
  if (props.initialData && !props.query && !props.region) {
    setCountries(props.initialData);
  } else {
    fetchCountries();
  }
});
</script>

<template>
  <div class="w-full min-h-[60vh] py-8 lg:py-12 bg-surface">
    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
      <article
        v-for="element in elements"
        :key="element"
        class="bg-surface border border-muted/10 rounded overflow-hidden"
      >
        <div class="aspect-3/2 bg-muted/20 animate-pulse"></div>
        <div class="p-6">
          <div class="w-3/5 h-5 bg-muted/20 animate-pulse rounded mb-4"></div>
          <div class="w-full h-3 bg-muted/20 animate-pulse rounded mb-3"></div>
          <div class="w-full h-3 bg-muted/20 animate-pulse rounded mb-3"></div>
          <div class="w-2/5 h-3 bg-muted/20 animate-pulse rounded"></div>
        </div>
      </article>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="flex justify-center items-center min-h-[400px]">
      <div class="flex flex-col items-center gap-4 text-center text-text">
        <ExclamationTriangleIcon class="w-12 h-12 text-terracotta dark:text-sage" />
        <p class="font-sans text-lg font-medium">{{ errorMessage }}</p>
        <Button variant="primary" @click="fetchCountries">
          Try Again
        </Button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="hasNoResults" class="flex justify-center items-center min-h-[400px]">
      <div class="flex flex-col items-center gap-4 text-center text-text" role="alert" aria-live="polite">
        <MagnifyingGlassIcon class="w-12 h-12 text-terracotta dark:text-sage" aria-hidden="true" />
        <p class="font-sans text-lg font-medium">No countries found</p>
        <span class="font-sans text-sm text-muted">Try adjusting your search or filter</span>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
      <Card
        v-for="(country, index) in countries"
        :key="country.cca3"
        :country="country"
        :index="index"
        :style="{ animationDelay: `${index * 0.05}s`, animation: `fade-in-up 0.6s ease-out ${index * 0.05}s forwards` }"
      />
    </div>
  </div>
</template>
