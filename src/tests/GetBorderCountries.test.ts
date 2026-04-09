import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetBorderCountries } from '../core/use-cases/GetBorderCountries';
import type { CountryRepository, Country } from '../core/interfaces/Repository';

const mockRepository: CountryRepository = {
  getAllCountries: vi.fn(),
  getCountryByCode: vi.fn(),
  searchCountries: vi.fn(),
  filterByRegion: vi.fn(),
};

describe('GetBorderCountries Use Case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return border countries when codes provided', async () => {
    const borderCountries: Country[] = [
      {
        name: { common: 'France', official: 'France', nativeName: { fra: { common: 'France', official: 'France' } } },
        capital: ['Paris'],
        region: 'Europe',
        subregion: 'Western Europe',
        population: 67390000,
        flags: { svg: 'fr.svg', png: 'fr.png', alt: 'flag of France' },
        tld: ['.fr'],
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { fra: 'French' },
        borders: [],
        cca3: 'FRA',
        cca2: 'FR',
        continents: ['Europe'],
        timezones: ['UTC+01:00'],
      },
      {
        name: { common: 'Portugal', official: 'Portugal', nativeName: { por: { common: 'Portugal', official: 'Portugal' } } },
        capital: ['Lisbon'],
        region: 'Europe',
        subregion: 'Southern Europe',
        population: 10300000,
        flags: { svg: 'pt.svg', png: 'pt.png', alt: 'flag of Portugal' },
        tld: ['.pt'],
        currencies: { EUR: { name: 'Euro', symbol: '€' } },
        languages: { por: 'Portuguese' },
        borders: [],
        cca3: 'PRT',
        cca2: 'PT',
        continents: ['Europe'],
        timezones: ['UTC+00:00'],
      },
    ];

    vi.mocked(mockRepository.getCountryByCode)
      .mockResolvedValueOnce(borderCountries[0])
      .mockResolvedValueOnce(borderCountries[1]);

    const useCase = new GetBorderCountries(mockRepository);
    const result = await useCase.execute(['FRA', 'PRT']);

    expect(result).toHaveLength(2);
    expect(result[0].common).toBe('France');
    expect(result[1].common).toBe('Portugal');
    expect(mockRepository.getCountryByCode).toHaveBeenCalledTimes(2);
  });

  it('should return empty array when no border codes', async () => {
    const useCase = new GetBorderCountries(mockRepository);
    const result = await useCase.execute([]);

    expect(result).toEqual([]);
    expect(mockRepository.getCountryByCode).not.toHaveBeenCalled();
  });

  it('should return empty array when borders is undefined', async () => {
    const useCase = new GetBorderCountries(mockRepository);
    const result = await useCase.execute([]);

    expect(result).toEqual([]);
  });

  it('should fetch all border countries in parallel', async () => {
    const mockCountry: Country = {
      name: { common: 'France', official: 'France', nativeName: {} },
      capital: ['Paris'],
      region: 'Europe',
      subregion: 'Western Europe',
      population: 67390000,
      flags: { svg: 'fr.svg', png: 'fr.png', alt: '' },
      tld: ['.fr'],
      currencies: { EUR: { name: 'Euro', symbol: '€' } },
      languages: { fra: 'French' },
      borders: [],
      cca3: 'FRA',
      cca2: 'FR',
      continents: ['Europe'],
      timezones: ['UTC+01:00'],
    };

    vi.mocked(mockRepository.getCountryByCode).mockResolvedValue(mockCountry);

    const useCase = new GetBorderCountries(mockRepository);
    await useCase.execute(['FRA', 'PRT', 'AND']);

    expect(mockRepository.getCountryByCode).toHaveBeenCalledTimes(3);
    expect(mockRepository.getCountryByCode).toHaveBeenNthCalledWith(1, 'FRA');
    expect(mockRepository.getCountryByCode).toHaveBeenNthCalledWith(2, 'PRT');
    expect(mockRepository.getCountryByCode).toHaveBeenNthCalledWith(3, 'AND');
  });
});
