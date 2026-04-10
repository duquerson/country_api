<script setup lang="ts">
const _props = defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}>;

const defaultVariants = {
  primary: 'bg-terracotta text-surface hover:bg-terracotta/90 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'bg-surface border border-muted/20 text-terracotta hover:bg-terracotta/10 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  outline: 'border border-terracotta text-terracotta hover:bg-terracotta/10 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  text: 'text-terracotta hover:bg-terracotta/10 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

const baseClasses = 'inline-flex items-center justify-center gap-2 rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none';
</script>

<template>
  <button
    :class="[
      baseClasses,
      defaultVariants[variant || 'primary'],
      sizes[size || 'md'],
      { 'cursor-not-allowed opacity-50': disabled }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>