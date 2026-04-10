import { actions } from 'astro:actions';
import { useAsync } from './useAsync';
import type { CountrySummary } from '../../core/domain/types';
import { toCountrySummary } from '../../core/domain/types';

export function useCountries() {
  const { 
    data: countries, 
    loading, 
    error, 
    execute: fetch, 
    setData 
  } = useAsync(async (filters: { query?: string; region?: string } = {}) => {
    const { data, error } = await actions.countries.getCountries(filters);
    if (error) throw new Error(error.message);
    return data || [];
  }, 'GetCountries');

  return {
    countries,
    loading,
    error,
    fetch,
    setCountries: setData
  };
}

export function useCountryDetail() {
  const { 
    data: country, 
    loading, 
    error, 
    execute: fetchByCode 
  } = useAsync(async (code: string) => {
    const { data, error } = await actions.countries.getByCode({ code });
    if (error) throw new Error(error.message);
    return data;
  }, 'GetCountryByCode');

  const fetchBorders = async (borderCodes: string[]): Promise<CountrySummary[]> => {
    if (!borderCodes?.length) return [];
    try {
      const results = await Promise.all(
        borderCodes.map(async (code) => {
          const { data } = await actions.countries.getByCode({ code });
          return data ? toCountrySummary(data) : null;
        })
      );
      return results.filter((c): c is CountrySummary => c !== null);
    } catch {
      return [];
    }
  };

  return {
    country,
    loading,
    error,
    fetchByCode,
    fetchBorders,
  };
}
