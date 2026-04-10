import type { CountryRepository } from '../../core/interfaces/Repository';
import type { Country, CountrySummary } from '../../core/domain/Country';
import { networkError, notFoundError, unknownError } from '../../core/domain/AppError';
import {
  safeParseCountryList,
  safeParseCountrySummaryList,
  type CountrySummaryParsed,
} from '../../core/domain/CountrySchema';

import { fetchWithRetry } from '../http/fetchWithRetry';
import { handleError, createNetworkError } from '../../core/services/ErrorService';
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
      throw networkError(response.status, '/all');
    }

    const data = await response.json();
    const parsed = safeParseCountrySummaryList(data);

    if (!parsed.success) {
      const error = unknownError(new Error('Invalid country data from API'));
      throw handleError(error, 'getAllCountries validation');
    }

    const result = this.mapToSummaries(parsed.data);
    setCache(cacheKey, result, CACHE_TTL);
    return result;
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
        throw notFoundError('Country', normalizedCode);
      }
      throw createNetworkError(response.status);
    }

    const data = await response.json();
    const parsed = safeParseCountryList(Array.isArray(data) ? data : [data]);

    if (!parsed.success || !parsed.data[0]) {
      throw notFoundError('Country', normalizedCode);
    }

    const country = parsed.data[0];
    setCache(cacheKey, country, CACHE_TTL);
    return country;
  }

  async searchCountries(query: string): Promise<CountrySummary[]> {
    const sanitized = query.trim();
    const response = await fetchWithRetry(
      `${API_URL}/name/${encodeURIComponent(sanitized)}?fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw createNetworkError(response.status);
    }

    const data = await response.json();
    const parsed = safeParseCountrySummaryList(data);

    if (!parsed.success) {
      return [];
    }

    return this.mapToSummaries(parsed.data);
  }

  async filterByRegion(region: string): Promise<CountrySummary[]> {
    const sanitized = region.trim();
    const response = await fetchWithRetry(
      `${API_URL}/region/${encodeURIComponent(sanitized)}?fields=${COUNTRY_FIELDS.SUMMARY}`,
      {
        timeout: HTTP_TIMEOUTS.STANDARD,
        retries: HTTP_TIMEOUTS.RETRIES,
      }
    );

    if (!response.ok) {
      throw networkError(response.status, `/region/${sanitized}`);
    }

    const data = await response.json();
    const parsed = safeParseCountrySummaryList(data);

    if (!parsed.success) {
      const error = unknownError(new Error('Invalid country data from API'));
      throw handleError(error, 'filterByRegion validation');
    }

    return this.mapToSummaries(parsed.data);
  }

  private mapToSummaries(countries: CountrySummaryParsed): CountrySummary[] {
    return countries.map((c) => ({
      cca3: c.cca3,
      common: c.name.common,
      capital: c.capital,
      region: c.region,
      population: c.population,
      flags: {
        svg: c.flags.svg,
        alt: c.flags.alt,
      },
    }));
  }
}

export default new CountryRepositoryImpl();

