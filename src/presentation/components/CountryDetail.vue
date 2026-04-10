<script setup lang="ts">
import { onMounted } from 'vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import ImageLazy from './ImageLazy.vue';
import Borders from './Borders.vue';
import Page404 from './Page404.vue';
import CountryDetailField from './CountryDetailField.vue';
import { getFirstNativeName, getFirstCurrency, getLanguages } from '../../core/domain/countryFormatters';
import { useFormatting } from '../../core/domain/useFormatting';
import { UI_LABELS } from '../../core/constants/uiLabels';
import { useCountryDetail } from '../composables/useCountries';

const { formatNumber } = useFormatting();

const props = defineProps<{
  code: string;
}>();

const { country, loading, error, fetchByCode } = useCountryDetail();

const goBack = () => {
  window.history.back();
};

onMounted(async () => {
  if (props.code) {
    await fetchByCode(props.code);
  }
});
</script>

<template>
  <div class="min-h-dvh pb-16">
    <section class="max-w-[1400px] mx-auto px-5 lg:px-8 py-12">
      <button
        @click="goBack"
        class="inline-flex items-center gap-3 px-6 py-3.5 bg-surface border border-muted/10 rounded shadow-sm text-[15px] font-semibold text-text cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 mb-12 focus:outline-none focus:ring-2 focus:ring-muted/50"
      >
        <ArrowLeftIcon class="w-5 h-5 text-text" />
        <span>Back</span>
      </button>

      <div v-if="loading" class="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">
        <div class="aspect-4/3 bg-muted/20 animate-pulse rounded"></div>
        <div class="pt-4 lg:pt-8 w-full flex flex-col gap-4">
          <div class="h-10 w-1/2 bg-muted/20 animate-pulse rounded mb-8"></div>
          <div class="h-4 w-full bg-muted/20 animate-pulse rounded"></div>
          <div class="h-4 w-full bg-muted/20 animate-pulse rounded"></div>
          <div class="h-4 w-3/4 bg-muted/20 animate-pulse rounded"></div>
        </div>
      </div>

      <div v-else-if="error || !country">
        <Page404 />
      </div>

      <section v-else-if="country" class="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">
        <div class="relative w-full rounded overflow-hidden shadow-sm" :style="{ viewTransitionName: 'country-flag-' + code }">
          <ImageLazy :countryFlag="country.flags.svg" :countryAlt="country.flags.alt" :priority="true" />
          <div class="absolute bottom-0 left-0 w-16 h-1 bg-linear-to-r from-muted to-muted/50 hidden"></div>
        </div>

        <div class="pt-4 lg:pt-10">
          <article class="flex items-baseline gap-4 mb-8 pb-6 border-b border-muted/10">
            <h2 class="font-sans text-[2rem] lg:text-[2.5rem] font-extrabold text-text leading-tight">{{ country.name.common }}</h2>
          </article>

          <div class="grid md:grid-cols-2 gap-y-8 gap-x-16 mb-12">
            <div class="flex flex-col gap-4">
              <CountryDetailField :label="UI_LABELS.NATIVE_NAME">
                {{ getFirstNativeName(country) }}
              </CountryDetailField>
              <CountryDetailField :label="UI_LABELS.POPULATION">
                {{ formatNumber(country.population) }}
              </CountryDetailField>
              <CountryDetailField :label="UI_LABELS.REGION">
                {{ country.region }}
              </CountryDetailField>
              <CountryDetailField :label="UI_LABELS.SUB_REGION">
                {{ country.subregion || 'N/A' }}
              </CountryDetailField>
              <div class="flex items-baseline gap-2 text-[15px]">
                <span class="font-semibold text-text">{{ UI_LABELS.CAPITAL }}</span>
                <span class="text-text font-light">{{ country.capital?.[0] || 'N/A' }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex items-baseline gap-2 text-[15px]">
                <span class="font-semibold text-text">{{ UI_LABELS.TOP_LEVEL_DOMAIN }}</span>
                <span class="text-text font-light">{{ country.tld?.[0] || 'N/A' }}</span>
              </div>
              <div class="flex items-baseline gap-2 text-[15px]">
                <span class="font-semibold text-text">{{ UI_LABELS.CURRENCIES }}</span>
                <span class="text-text font-light">
                  {{ getFirstCurrency(country) }}
                </span>
              </div>
              <div class="flex items-baseline gap-2 text-[15px]">
                <span class="font-semibold text-text">{{ UI_LABELS.LANGUAGES }}</span>
                <span class="text-text font-light leading-relaxed">
                  {{ getLanguages(country) }}
                </span>
              </div>
            </div>
          </div>

          <section v-if="country.borders?.length" class="border-t border-muted/10 pt-8 mt-8">
            <h3 class="text-lg font-semibold text-text mb-6">{{ UI_LABELS.BORDER_COUNTRIES }}</h3>
            <Borders :borders="country.borders" />
          </section>
        </div>
      </section>
    </section>
  </div>
</template>
