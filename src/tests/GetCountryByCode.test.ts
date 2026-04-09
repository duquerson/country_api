import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCountryByCode } from '../core/use-cases/GetCountryByCode';
import type { CountryRepository, Country } from '../core/interfaces/Repository';

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

  it('should return country by code', async () => {
    const expectedCountry: Country = {
      name: { common: 'Spain', official: 'Kingdom of Spain', nativeName: { spa: { common: 'España', official: 'Reino de España' } } },
      capital: ['Madrid'],
      region: 'Europe',
      subregion: 'Southern Europe',
      population: 47000000,
      flags: { svg: 'flag.svg', png: 'flag.png', alt: 'flag of Spain' },
      tld: ['.es'],
      currencies: { EUR: { name: 'Euro', symbol: '€' } },
      languages: { spa: 'Spanish' },
      borders: ['FRA', 'PRT'],
      cca3: 'ESP',
      cca2: 'ES',
      continents: ['Europe'],
      timezones: ['UTC+01:00'],
    };
    vi.mocked(mockRepository.getCountryByCode).mockResolvedValue(expectedCountry);

    const useCase = new GetCountryByCode(mockRepository);
    const result = await useCase.execute('ESP');

    expect(result).toEqual(expectedCountry);
    expect(mockRepository.getCountryByCode).toHaveBeenCalledWith('ESP');
  });

  it('should propagate errors when country not found', async () => {
    vi.mocked(mockRepository.getCountryByCode).mockRejectedValue(new Error('Country not found'));

    const useCase = new GetCountryByCode(mockRepository);

    await expect(useCase.execute('XXX')).rejects.toThrow('Country not found');
  });
});
