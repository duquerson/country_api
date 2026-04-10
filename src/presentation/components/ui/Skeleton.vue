<script setup lang="ts">
defineProps<{
  width?: string;
  height?: string;
  className?: string;
}>();
</script>

<template>
  <div 
    class="bg-muted/20 animate-pulse rounded"
    :class="className"
    :style="{ width, height }"
  ></div>
</template>
