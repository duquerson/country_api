<script setup lang="ts">
import { ref } from 'vue';
import Search from '@presentation/components/country/Search.vue';
import ListContinents from '@presentation/components/country/ListContinents.vue';
import CountryBody from '@presentation/components/country/CountryBody.vue';
import type { CountrySummary } from '@core/domain/types';

const props = defineProps<{
  initialData?: CountrySummary[];
}>();

const query = ref('');
const region = ref('');

const handleSearch = (q: string) => {
  query.value = q;
};

const handleSelect = (r: string) => {
  if (region.value && r !== region.value) {
    query.value = '';
  }
  region.value = r;
};
</script>

<template>
  <div class="w-full bg-surface border-b border-muted/10">
    <div class="max-w-(--size-container) mx-auto py-6 px-5 lg:px-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
      <div class="flex-1 min-w-[280px] max-w-full md:max-w-[420px]">
        <Search @search="handleSearch" />
      </div>
      <div class="min-w-[180px] w-full md:w-auto">
        <ListContinents @select="handleSelect" />
      </div>
    </div>
  </div>
  <CountryBody 
    :query="query" 
    :region="region" 
    :initial-data="props.initialData"
  />
</template>