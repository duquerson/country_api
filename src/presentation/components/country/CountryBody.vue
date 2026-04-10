<script setup lang="ts">
import { watch, onMounted, computed } from 'vue';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import Card from '@presentation/components/country/Card.vue';
import Button from '@presentation/components/ui/Button.vue';
import Skeleton from '@presentation/components/ui/Skeleton.vue';
import { useCountries } from '@presentation/composables/useCountries';
import { getFriendlyMessage } from '@core/domain/errors';
import type { CountrySummary } from '@core/domain/types';
import { CONFIG } from '@core/constants/config';
import { UI_LABELS } from '@core/constants/uiLabels';

const props = defineProps<{
  query: string;
  region: string;
  initialData?: CountrySummary[];
}>();

const { countries, loading, error, fetch, setCountries } = useCountries();

const elements = Array.from({ length: CONFIG.SKELETON_COUNT }, (_, i) => i + 1);

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
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-(--size-container) mx-auto">
      <article
        v-for="element in elements"
        :key="element"
        class="bg-surface border border-muted/10 rounded overflow-hidden"
      >
        <Skeleton height="200px" className="rounded-none" />
        <div class="p-6">
          <Skeleton width="60%" height="20px" className="mb-4" />
          <Skeleton width="100%" height="12px" className="mb-3" />
          <Skeleton width="100%" height="12px" className="mb-3" />
          <Skeleton width="40%" height="12px" />
        </div>
      </article>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="flex justify-center items-center min-h-[400px]">
      <div class="flex flex-col items-center gap-4 text-center text-text">
        <ExclamationTriangleIcon class="w-12 h-12 text-terracotta dark:text-sage" />
        <p class="font-sans text-lg font-medium">{{ errorMessage }}</p>
        <Button variant="primary" @click="fetchCountries">
          {{ UI_LABELS.TRY_AGAIN }}
        </Button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="hasNoResults" class="flex justify-center items-center min-h-[400px]">
      <div class="flex flex-col items-center gap-4 text-center text-text" role="alert" aria-live="polite">
        <MagnifyingGlassIcon class="w-12 h-12 text-terracotta dark:text-sage" aria-hidden="true" />
        <p class="font-sans text-lg font-medium">{{ UI_LABELS.NO_RESULTS }}</p>
        <span class="font-sans text-sm text-muted">{{ UI_LABELS.NO_RESULTS_SUBTEXT }}</span>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-(--size-container) mx-auto">
      <Card
        v-for="(country, index) in countries"
        :key="country.cca3"
        :country="country"
        :index="index"
        :style="{ animationDelay: `${index * CONFIG.ANIMATION_DELAY_STEP}s`, animation: `fade-in-up 0.6s ease-out ${index * CONFIG.ANIMATION_DELAY_STEP}s forwards` }"
      />
    </div>
  </div>
</template>
