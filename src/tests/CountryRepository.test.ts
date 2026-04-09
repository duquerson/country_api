import { describe, it, expect, vi, beforeEach } from 'vitest';
import CountryRepositoryImpl from '../infrastructure/repositories/CountryRepositoryImpl';

import { getMockCountries } from './fixtures/mockData';
import type { Country } from '@core/domain/Country';


let mockCountry: Country;
beforeAll(() => {
  // Buscar España en el mock
  const countries = getMockCountries();
  mockCountry = countries.find((c: any) => c.cca3 === 'ESP' || c.name.common === 'Spain');
});



describe('CountryRepositoryImpl', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch all countries', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      } as Response)
    );

    const result = await CountryRepositoryImpl.getAllCountries();
    expect(result).toHaveLength(1);
    expect(result[0].common).toBe(mockCountry.name.common);
  });

  it('should search countries by name', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      } as Response)
    );

    const result = await CountryRepositoryImpl.searchCountries(mockCountry.name.common);
    expect(result).toHaveLength(1);
    expect(result[0].common).toBe(mockCountry.name.common);
  });

  it('should filter countries by region', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      } as Response)
    );

    const result = await CountryRepositoryImpl.filterByRegion(mockCountry.region);
    expect(result).toHaveLength(1);
    expect(result[0].region).toBe(mockCountry.region);
  });

  it('should get country by code', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCountry]),
      } as Response)
    );

    const result = await CountryRepositoryImpl.getCountryByCode(mockCountry.cca3);
    expect(result.name.common).toBe(mockCountry.name.common);
  });
});
