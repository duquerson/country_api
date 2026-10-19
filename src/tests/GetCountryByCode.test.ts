import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCountryByCode } from '../core/use-cases/GetCountryByCode';
import type { CountryRepository } from '../core/interfaces/Repository';
import type { Country } from '../core/domain/types';

const mockRepository: CountryRepository = {
  getAllCountries: vi.fn(),
  getCountryByCode: vi.fn(),
  searchCountries: vi.fn(),
  filterByRegion: vi.fn(),
};

describe('GetCountryByCode Use Case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return country by code (v5 structure)', async () => {
    const expectedCountry: Country = {
      names: {
        common: 'Spain',
        official: 'Kingdom of Spain',
        native: { spa: { common: 'España', official: 'Reino de España' } },
      },
      capitals: [{ name: 'Madrid', primary: true }],
      region: 'Europe',
      subregion: 'Southern Europe',
      population: 47000000,
      flag: { url_svg: 'https://flags.restcountries.com/v5/svg/es.svg', emoji: '🇪🇸' },
      tlds: ['.es'],
      currencies: [{ code: 'EUR', name: 'Euro', symbol: '€' }],
      languages: [{ name: 'Spanish', bcp47: 'es' }],
      borders: ['FRA', 'PRT'],
      codes: { alpha_3: 'ESP', alpha_2: 'ES' },
      continents: ['Europe'],
      timezones: ['UTC+01:00'],
    };
    vi.mocked(mockRepository.getCountryByCode).mockResolvedValue(expectedCountry);

    const useCase = new GetCountryByCode(mockRepository);
    const result = await useCase.execute('ESP');

    expect(result).toEqual(expectedCountry);
    expect(mockRepository.getCountryByCode).toHaveBeenCalledWith('ESP');
    expect(result.names.common).toBe('Spain');
    expect(result.codes.alpha_3).toBe('ESP');
  });
});
