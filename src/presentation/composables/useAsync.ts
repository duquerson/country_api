import { ref, readonly } from 'vue';
import { handleError, type AppError } from '../../core/domain/errors';

export function useAsync<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  context: string
) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<AppError | null>(null);

  const execute = async (...args: Args): Promise<T | null> => {
    loading.value = true;
    error.value = null;
    try {
      const result = await fn(...args);
      data.value = result;
      return result;
    } catch (e) {
      error.value = handleError(e, context);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    execute,
    setData: (newData: T) => { data.value = newData; }
  };
}
