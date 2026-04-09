import { ref, readonly, type Ref } from 'vue';
import { actions } from 'astro:actions';
import type { CountrySummary, Country } from '../../core/domain/Country';
import { toCountrySummary } from '../../core/domain/Country';
import { handleError } from '../../core/services/ErrorService';
import { AppError } from '../../core/domain/AppError';

async function executeAsyncOperation<T>(
  asyncFn: () => Promise<T>, 
  loading: Ref<boolean>, 
  error: Ref<AppError | null>, 
  errorContext: string
): Promise<T | undefined> {
  loading.value = true;
  error.value = null;
  try {
    return await asyncFn();
  } catch (e) {
    error.value = handleError(e, errorContext);
    return undefined;
  } finally {
    loading.value = false;
  }
}

export function useCountries() {
  const countries = ref<CountrySummary[]>([]);
  const loading = ref(false);
  const error = ref<AppError | null>(null);

  const fetchAll = async (): Promise<CountrySummary[]> => {
    const result = await executeAsyncOperation(
      async () => {
        const { data, error: actionError } = await actions.countries.getAll();
        if (actionError) throw new Error(actionError.message);
        return data;
      },
      loading,
      error,
      'GetAllCountries'
    );
    if (result) {
      countries.value = result;
      return result;
    }
    return [];
  };

  const search = async (query: string): Promise<CountrySummary[]> => {
    const result = await executeAsyncOperation(
      async () => {
        const { data, error: actionError } = await actions.countries.search({ query });
        if (actionError) throw new Error(actionError.message);
        return data;
      },
      loading,
      error,
      'SearchCountries'
    );
    if (result) {
      countries.value = result;
      return result;
    }
    return [];
  };

  const filter = async (region: string): Promise<CountrySummary[]> => {
    const result = await executeAsyncOperation(
      async () => {
        const { data, error: actionError } = await actions.countries.filterByRegion({ region });
        if (actionError) throw new Error(actionError.message);
        return data;
      },
      loading,
      error,
      'FilterByRegion'
    );
    if (result) {
      countries.value = result;
      return result;
    }
    return [];
  };

  return {
    countries: readonly(countries),
    loading: readonly(loading),
    error: readonly(error),
    fetchAll,
    search,
    filter,
  };
}

export function useCountryDetail() {
  const country = ref<Country | null>(null);
  const loading = ref(true);
  const error = ref<AppError | null>(null);

  const fetchByCode = async (code: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: actionError } = await actions.countries.getByCode({ code });
      if (actionError) throw new Error(actionError.message);
      country.value = data;
    } catch (e) {
      error.value = handleError(e, 'GetCountryByCode');
    } finally {
      loading.value = false;
    }
  };

  const fetchBorders = async (borderCodes: string[]) => {
    try {
      if (!borderCodes || borderCodes.length === 0) return [];
      const results = await Promise.all(
        borderCodes.map(async (code) => {
          const { data } = await actions.countries.getByCode({ code });
          return toCountrySummary(data);
        })
      );
      return results;
    } catch (e) {
      const appError = handleError(e, 'GetBorderCountries');
      if (import.meta.env.DEV) {
        console.error('Failed to fetch borders:', appError.message);
      }
      return [];
    }
  };

  return {
    country: readonly(country),
    loading: readonly(loading),
    error: readonly(error),
    fetchByCode,
    fetchBorders,
  };
}
