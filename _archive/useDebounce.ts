import { ref } from 'vue';

export function useDebounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number = 300
) {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = ((...args: Parameters<T>) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    timeout.value = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T & { cancel: () => void };

  debouncedFn.cancel = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = null;
    }
  };

  return debouncedFn;
}