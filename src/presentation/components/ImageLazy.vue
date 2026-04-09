<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  countryFlag: string;
  countryAlt?: string;
  priority?: boolean;
}>();

const imageLoaded = ref(false);

const loadingStrategy = computed(() => {
  if (props.priority) return 'eager';
  return 'lazy';
});

const decodingStrategy = computed(() => {
  if (props.priority) return 'sync';
  return 'async';
});

const fetchPriority = computed(() => {
  if (props.priority) return 'high';
  return 'auto';
});

const handleLoad = () => {
  imageLoaded.value = true;
};
</script>

<template>
  <img
    v-bind="$attrs"
    :src="countryFlag"
    :alt="countryAlt"
    :loading="loadingStrategy"
    :decoding="decodingStrategy"
    :fetchpriority="fetchPriority"
    @load="handleLoad"
    :style="{ viewTransitionName: 'country-flag-' + countryFlag.split('/').pop()?.replace('.svg', '') }"
    class="w-full h-full object-cover transition-opacity duration-500"
    :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
  />
</template>
