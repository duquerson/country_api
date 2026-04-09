import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchCountries } from '../core/use-cases/SearchCountries';
import type { CountryRepository, CountrySummary } from '../core/interfaces/Repository';

const mockRepository: CountryRepository = {
  getAllCountries: vi.fn(),
  getCountryByCode: vi.fn(),
  searchCountries: vi.fn(),
  filterByRegion: vi.fn(),
};

describe('SearchCountries Use Case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should search countries by query', async () => {
    const expectedResults: CountrySummary[] = [
      { cca3: 'ESP', common: 'Spain', capital: ['Madrid'], region: 'Europe', population: 47000000, flags: { svg: 'flag.svg' } },
    ];
    vi.mocked(mockRepository.searchCountries).mockResolvedValue(expectedResults);

    const useCase = new SearchCountries(mockRepository);
    const result = await useCase.execute('Spain');

    expect(result).toEqual(expectedResults);
    expect(mockRepository.searchCountries).toHaveBeenCalledWith('Spain');
  });

  it('should return all countries when query is empty', async () => {
    const allCountries: CountrySummary[] = [
      { cca3: 'ESP', common: 'Spain', capital: ['Madrid'], region: 'Europe', population: 47000000, flags: { svg: 'flag.svg' } },
    ];
    vi.mocked(mockRepository.getAllCountries).mockResolvedValue(allCountries);

    const useCase = new SearchCountries(mockRepository);
    const result = await useCase.execute('');

    expect(result).toEqual(allCountries);
    expect(mockRepository.getAllCountries).toHaveBeenCalled();
    expect(mockRepository.searchCountries).not.toHaveBeenCalled();
  });

  it('should return all countries when query is whitespace only', async () => {
    const allCountries: CountrySummary[] = [];
    vi.mocked(mockRepository.getAllCountries).mockResolvedValue(allCountries);

    const useCase = new SearchCountries(mockRepository);
    await useCase.execute('   ');

    expect(mockRepository.getAllCountries).toHaveBeenCalled();
  });
});
