<template>
  <div class="flex items-baseline gap-2 text-[15px]">
    <span class="font-semibold text-text">{{ label }}:</span>
    <span class="text-text font-light"><slot /></span>
  </div>
</template>
<script setup lang="ts">
defineProps<{ label: string }>();
</script>
