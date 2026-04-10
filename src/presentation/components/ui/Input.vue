<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  type?: string;
  placeholder?: string;
  id?: string;
  label?: string;
  hasIcon?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'submit'?: [];
}>();
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="sr-only">{{ label }}</label>
    <div class="relative">
      <div v-if="$slots.icon" class="absolute left-6 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
        <slot name="icon" />
      </div>
      
      <input
        :id="id"
        :type="type || 'text'"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @keyup.enter="emit('submit')"
        :placeholder="placeholder"
        class="w-full h-14 bg-surface text-text text-sm rounded shadow-md outline-none border border-transparent focus:border-muted/30 focus:shadow-lg transition-all placeholder:text-muted"
        :class="{ 'pl-16 pr-6': hasIcon, 'px-6': !hasIcon }"
      />
    </div>
  </div>
</template>
