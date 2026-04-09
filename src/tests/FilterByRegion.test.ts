import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FilterByRegion } from '../core/use-cases/FilterByRegion';
import type { CountryRepository, CountrySummary } from '../core/interfaces/Repository';

const mockRepository: CountryRepository = {
  getAllCountries: vi.fn(),
  getCountryByCode: vi.fn(),
  searchCountries: vi.fn(),
  filterByRegion: vi.fn(),
};

describe('FilterByRegion Use Case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should filter countries by region', async () => {
    const expectedCountries: CountrySummary[] = [
      { cca3: 'ESP', common: 'Spain', capital: ['Madrid'], region: 'Europe', population: 47000000, flags: { svg: 'flag.svg' } },
    ];
    vi.mocked(mockRepository.filterByRegion).mockResolvedValue(expectedCountries);

    const useCase = new FilterByRegion(mockRepository);
    const result = await useCase.execute('Europe');

    expect(result).toEqual(expectedCountries);
    expect(mockRepository.filterByRegion).toHaveBeenCalledWith('Europe');
  });

  it('should return all countries when region is empty', async () => {
    const allCountries: CountrySummary[] = [
      { cca3: 'ESP', common: 'Spain', capital: ['Madrid'], region: 'Europe', population: 47000000, flags: { svg: 'flag.svg' } },
    ];
    vi.mocked(mockRepository.getAllCountries).mockResolvedValue(allCountries);

    const useCase = new FilterByRegion(mockRepository);
    await useCase.execute('');

    expect(mockRepository.getAllCountries).toHaveBeenCalled();
    expect(mockRepository.filterByRegion).not.toHaveBeenCalled();
  });
});
