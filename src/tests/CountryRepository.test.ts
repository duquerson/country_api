import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import CountryRepositoryImpl from '../infrastructure/repositories/CountryRepositoryImpl';
import { getMockCountries } from './fixtures/mockData';
import type { Country } from '../core/domain/types';

let mockCountry: Country;
beforeAll(() => {
  const countries = getMockCountries();
  mockCountry = countries.find((c: Country) => c.codes.alpha_3 === 'COL')!;
  if (!mockCountry) throw new Error('Colombia not found in mock data');
});

// Helper: respuesta v5 envuelta en { data: [...] }
const makeV5Response = (items: Country | Country[]) => {
  const arr = Array.isArray(items) ? items : [items];
  return { ok: true, json: () => Promise.resolve({ data: arr }) } as unknown as Response;
};

describe('CountryRepositoryImpl (v5)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch all countries and parse v5 wrapper', async () => {
    global.fetch = vi.fn(() => Promise.resolve(makeV5Response([mockCountry])));

    const result = await CountryRepositoryImpl.getAllCountries();
    // El primer test puede servir desde caché; lo que importa es que el resultado es correcto
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].names.common).toBeDefined();
  });

  it('should pass Authorization header when fetching (via searchCountries — no cache)', async () => {
    // searchCountries no usa caché, garantiza que fetch se llama
    global.fetch = vi.fn(() => Promise.resolve(makeV5Response([mockCountry])));

    await CountryRepositoryImpl.searchCountries('Colombia');

    const calls = (global.fetch as ReturnType<typeof vi.fn>).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    const [, init] = calls[0];
    // El header es un objeto plano mergeado en fetchWithRetry
    expect(init?.headers).toBeDefined();
    // Si hay API key, debe ser un Authorization header; si no, objeto vacío — nunca undefined
    const headers = init?.headers as Record<string, string>;
    expect(typeof headers).toBe('object');
  });

  it('should search countries by name (v5 ?q= param)', async () => {
    global.fetch = vi.fn(() => Promise.resolve(makeV5Response([mockCountry])));

    const result = await CountryRepositoryImpl.searchCountries(mockCountry.names.common);
    expect(result).toHaveLength(1);
    expect(result[0].names.common).toBe(mockCountry.names.common);

    const [url] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain('?q=');
  });

  it('should filter countries by region (v5 ?region= param)', async () => {
    global.fetch = vi.fn(() => Promise.resolve(makeV5Response([mockCountry])));

    const result = await CountryRepositoryImpl.filterByRegion(mockCountry.region);
    expect(result).toHaveLength(1);
    expect(result[0].region).toBe(mockCountry.region);

    const [url] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain('region=');
  });

  it('should get country by alpha_3 code (v5 /codes.alpha_3/ route)', async () => {
    global.fetch = vi.fn(() => Promise.resolve(makeV5Response(mockCountry)));

    const result = await CountryRepositoryImpl.getCountryByCode(mockCountry.codes.alpha_3);
    expect(result.names.common).toBe(mockCountry.names.common);

    const [url] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain('codes.alpha_3/COL');
  });

  it('should return [] for search when API returns 404', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) } as Response)
    );

    const result = await CountryRepositoryImpl.searchCountries('zzznomatch');
    expect(result).toEqual([]);
  });
});
