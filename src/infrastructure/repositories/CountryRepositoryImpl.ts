import type { CountryRepository } from '../../core/interfaces/Repository';
import type { Country, CountrySummary } from '../../core/domain/types';
import { AppError } from '../../core/domain/errors';
import {
  apiResponseSchema,
  apiSummaryResponseSchema,
} from '../../core/domain/schemas';

import { fetchWithRetry } from '../http/fetchWithRetry';
import { API_URL, COUNTRY_FIELDS, HTTP_TIMEOUTS } from '../config/api';
import { getCached, setCache } from '../cache/apiCache';
import { CACHE_CONFIG } from '../config/cache';


class CountryRepositoryImpl implements CountryRepository {
  async getAllCountries(): Promise<CountrySummary[]> {
    const cacheKey = CACHE_CONFIG.COUNTRIES_ALL;
    const cached = getCached<CountrySummary[]>(cacheKey);
    if (cached) return cached;

    const response = await fetchWithRetry(
      `${API_URL}?response_fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      throw AppError.network(response.status, '/countries/v5');
    }

    const raw = await response.json();
    const parsed = apiSummaryResponseSchema.safeParse(raw);

    if (!parsed.success) {
      throw AppError.unknown(new Error('Invalid country data from API'));
    }

    // Filtrar países sin código alpha_3 válido
    const validCountries = parsed.data.data.objects.filter(c => c.codes.alpha_3);
    setCache(cacheKey, validCountries);
    return validCountries;
  }

  async getCountryByCode(code: string): Promise<Country> {
    const normalizedCode = code.trim().toUpperCase();
    const cacheKey = `${CACHE_CONFIG.COUNTRY_PREFIX}${normalizedCode.toLowerCase()}`;
    const cached = getCached<Country>(cacheKey);
    if (cached) return cached;

    // v5: /countries/v5/codes.alpha_3/{CODE}
    const url = `${API_URL}/codes.alpha_3/${encodeURIComponent(normalizedCode)}?response_fields=${COUNTRY_FIELDS.DETAIL}`;
    const response = await fetchWithRetry(url, {
      timeout: HTTP_TIMEOUTS.STANDARD,
      retries: HTTP_TIMEOUTS.RETRIES,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw AppError.notFound('Country', normalizedCode);
      }
      throw AppError.network(response.status, `/codes.alpha_3/${normalizedCode}`);
    }

    const raw = await response.json();

    // v5 /codes.alpha_3/{CODE} puede devolver { data: { objects: [...] } }
    let dataArray: unknown[];
    if (raw && typeof raw === 'object' && 'data' in raw) {
      const dataObj = raw.data as Record<string, unknown>;
      dataArray = Array.isArray(dataObj.objects) ? dataObj.objects : [dataObj.objects];
    } else {
      dataArray = Array.isArray(raw) ? raw : [raw];
    }

    const parsed = apiResponseSchema.safeParse({ data: { objects: dataArray } });

    if (!parsed.success || !parsed.data.data.objects[0]) {
      throw AppError.notFound('Country', normalizedCode);
    }

    const country = parsed.data.data.objects[0];
    setCache(cacheKey, country);
    return country;
  }

  async searchCountries(query: string): Promise<CountrySummary[]> {
    const sanitized = query.trim();
    if (!sanitized) return this.getAllCountries();

    // v5: búsqueda con ?q=
    const response = await fetchWithRetry(
      `${API_URL}?q=${encodeURIComponent(sanitized)}&response_fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      if (response.status === 404) return [];
      throw AppError.network(response.status, `/countries/v5?q=${sanitized}`);
    }

    const raw = await response.json();
    const parsed = apiSummaryResponseSchema.safeParse(raw);

    if (!parsed.success) return [];
    return parsed.data.data.objects;
  }

  async filterByRegion(region: string): Promise<CountrySummary[]> {
    const sanitized = region.trim();
    if (!sanitized) return this.getAllCountries();

    // v5: filtro con ?region=
    const response = await fetchWithRetry(
      `${API_URL}?region=${encodeURIComponent(sanitized)}&response_fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      throw AppError.network(response.status, `/countries/v5?region=${sanitized}`);
    }

    const raw = await response.json();
    const parsed = apiSummaryResponseSchema.safeParse(raw);

    if (!parsed.success) {
      throw AppError.unknown(new Error('Invalid country data from API'));
    }

    return parsed.data.data.objects;
  }
}

export default new CountryRepositoryImpl();
