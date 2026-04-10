import type { CountryRepository } from '../../core/interfaces/Repository';
import type { Country, CountrySummary } from '../../core/domain/types';
import { AppError } from '../../core/domain/errors';
import {
  countryListSchema,
  countrySummaryListSchema,
} from '../../core/domain/schemas';

import { fetchWithRetry } from '../http/fetchWithRetry';
import { API_URL, COUNTRY_FIELDS } from '../config/api';
import { HTTP_TIMEOUTS } from '../config/http';
import { getCached, setCache } from '../cache/apiCache';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

class CountryRepositoryImpl implements CountryRepository {
  async getAllCountries(): Promise<CountrySummary[]> {
    const cacheKey = 'countries:all';
    const cached = getCached<CountrySummary[]>(cacheKey);
    if (cached) return cached;

    const response = await fetchWithRetry(`${API_URL}/all?fields=${COUNTRY_FIELDS.SUMMARY}`, {
      timeout: HTTP_TIMEOUTS.STANDARD,
      retries: HTTP_TIMEOUTS.RETRIES,
    });

    if (!response.ok) {
      throw AppError.network(response.status, '/all');
    }

    const data = await response.json();
    const parsed = countrySummaryListSchema.safeParse(data);

    if (!parsed.success) {
      throw AppError.unknown(new Error('Invalid country data from API'));
    }

    setCache(cacheKey, parsed.data, CACHE_TTL);
    return parsed.data;
  }

  async getCountryByCode(code: string): Promise<Country> {
    const normalizedCode = code.trim().toUpperCase();
    const cacheKey = `country:${normalizedCode.toLowerCase()}`;
    const cached = getCached<Country>(cacheKey);
    if (cached) return cached;

    const url = `${API_URL}/alpha/${encodeURIComponent(normalizedCode)}?fields=${COUNTRY_FIELDS.DETAIL}`;
    const response = await fetchWithRetry(url, {
      timeout: HTTP_TIMEOUTS.STANDARD,
      retries: HTTP_TIMEOUTS.RETRIES,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw AppError.notFound('Country', normalizedCode);
      }
      throw AppError.network(response.status, `/alpha/${normalizedCode}`);
    }

    const data = await response.json();
    const parsed = countryListSchema.safeParse(Array.isArray(data) ? data : [data]);

    if (!parsed.success || !parsed.data[0]) {
      throw AppError.notFound('Country', normalizedCode);
    }

    const country = parsed.data[0];
    setCache(cacheKey, country, CACHE_TTL);
    return country;
  }

  async searchCountries(query: string): Promise<CountrySummary[]> {
    const sanitized = query.trim();
    if (!sanitized) return this.getAllCountries();

    const response = await fetchWithRetry(
      `${API_URL}/name/${encodeURIComponent(sanitized)}?fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      if (response.status === 404) return [];
      throw AppError.network(response.status, `/name/${sanitized}`);
    }

    const data = await response.json();
    const parsed = countrySummaryListSchema.safeParse(data);

    return parsed.success ? parsed.data : [];
  }

  async filterByRegion(region: string): Promise<CountrySummary[]> {
    const sanitized = region.trim();
    if (!sanitized) return this.getAllCountries();

    const response = await fetchWithRetry(
      `${API_URL}/region/${encodeURIComponent(sanitized)}?fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      throw AppError.network(response.status, `/region/${sanitized}`);
    }

    const data = await response.json();
    const parsed = countrySummaryListSchema.safeParse(data);

    if (!parsed.success) {
      throw AppError.unknown(new Error('Invalid country data from API'));
    }

    return parsed.data;
  }
}

export default new CountryRepositoryImpl();
