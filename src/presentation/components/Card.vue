<script setup lang="ts">
import type { CountrySummary } from '../../core/domain/Country';
import ImageLazy from './ImageLazy.vue';
import { useFormatting } from '../../core/domain/useFormatting';
import { UI_LABELS } from '../../core/constants/uiLabels';

const props = defineProps<{
  country: CountrySummary;
  index?: number;
}>();

defineEmits<{
  country: [country: CountrySummary];
  load: [data: { loadButton: boolean }];
}>();

const { formatNumber } = useFormatting();
const countryCode = props.country.cca3.toLowerCase();
const isAboveFold = props.index !== undefined && props.index < 8;
</script>

<template>
  <a 
    :href="`/detail/${countryCode}`"
    class="block bg-surface border border-muted/10 rounded overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 relative group"
  >
    <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-muted to-muted/50 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

    <div class="aspect-3/2 bg-muted/20 relative overflow-hidden">
      <ImageLazy
        :countryFlag="country.flags.svg"
        :countryAlt="country.flags.alt || country.common"
        :priority="isAboveFold"
      />
    </div>

    <div class="p-6 pb-8">
      <h2 class="text-lg font-extrabold text-text mb-4 leading-tight drop-shadow-sm line-clamp-1" :title="country.common">
        {{ country.common }}
      </h2>

      <div class="flex flex-col gap-2">
        <div class="flex items-baseline gap-1 text-[14px]">
          <span class="font-semibold text-text">{{ UI_LABELS.POPULATION }}</span>
          <span class="text-text font-light">{{ formatNumber(country.population) }}</span>
        </div>
        
        <div class="flex items-baseline gap-1 text-[14px]">
          <span class="font-semibold text-text">{{ UI_LABELS.REGION }}</span>
          <span class="text-text font-light">{{ country.region }}</span>
        </div>
        
        <div class="flex items-baseline gap-1 text-[14px]">
          <span class="font-semibold text-text">{{ UI_LABELS.CAPITAL }}</span>
          <span class="text-text font-light truncate" :title="country.capital.join(', ')">
            {{ country.capital?.length ? country.capital.join(', ') : 'None' }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
