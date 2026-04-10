<script setup lang="ts">
const props = defineProps<{
  variant?: 'outline' | 'surface' | 'soft';
  clickable?: boolean;
}>();

const variants = {
  outline: 'bg-surface border border-muted/20 text-text hover:border-muted/40',
  surface: 'bg-muted/10 text-text',
  soft: 'bg-terracotta/10 text-terracotta border border-terracotta/20'
};
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[13px] font-medium transition-all duration-200"
    :class="[
      variants[variant || 'outline'],
      clickable ? 'cursor-pointer hover:-translate-y-0.5 shadow-xs hover:shadow-sm active:translate-y-0' : ''
    ]"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>
