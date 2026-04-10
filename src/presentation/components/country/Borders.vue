<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import Badge from '@presentation/components/ui/Badge.vue';
import Skeleton from '@presentation/components/ui/Skeleton.vue';
import { useCountryDetail } from '@presentation/composables/useCountries';
import type { CountrySummary } from '@core/domain/types';

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
       <Skeleton v-for="i in 3" :key="i" width="80px" height="32px" />
    </div>
    <Badge
      v-for="country in borderCountries"
      :key="country.cca3"
      clickable
      @click="() => handle_click(country.cca3)"
      class="group"
    >
      <span>{{ country.name.common }}</span>
      <template #icon-right>
        <ArrowRightIcon class="w-3.5 h-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-1" />
      </template>
    </Badge>
  </div>
</template>