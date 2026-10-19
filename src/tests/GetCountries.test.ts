import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCountries } from '../core/use-cases/GetCountries';
import type { CountryRepository } from '../core/interfaces/Repository';
import { getMockCountries } from './fixtures/mockData';

// Convertir Country completos a CountrySummary para el repositorio mock
const mockCountriesList = getMockCountries().map(c => ({
  codes: { alpha_3: c.codes.alpha_3 },
  names: { common: c.names.common },
  capitals: c.capitals,
  region: c.region,
  population: c.population,
  flag: { url_svg: c.flag.url_svg, emoji: c.flag.emoji },
}));

const mockRepository: CountryRepository = {
  getAllCountries: vi.fn(),
  getCountryByCode: vi.fn(),
  searchCountries: vi.fn(),
  filterByRegion: vi.fn(),
};

describe('GetCountries Unified Use Case', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getAllCountries when no filters are provided', async () => {
    vi.mocked(mockRepository.getAllCountries).mockResolvedValue(mockCountriesList);
    const useCase = new GetCountries(mockRepository);
    const result = await useCase.execute();

    expect(result).toEqual(mockCountriesList);
    expect(mockRepository.getAllCountries).toHaveBeenCalled();
  });

  it('should call searchCountries when query is provided', async () => {
    vi.mocked(mockRepository.searchCountries).mockResolvedValue([mockCountriesList[0]]);
    const useCase = new GetCountries(mockRepository);
    const result = await useCase.execute({ query: 'Colombia' });

    expect(result).toHaveLength(1);
    expect(mockRepository.searchCountries).toHaveBeenCalledWith('Colombia');
  });

  it('should call filterByRegion when region is provided', async () => {
    vi.mocked(mockRepository.filterByRegion).mockResolvedValue([mockCountriesList[0]]);
    const useCase = new GetCountries(mockRepository);
    const result = await useCase.execute({ region: 'Americas' });

    expect(result).toHaveLength(1);
    expect(mockRepository.filterByRegion).toHaveBeenCalledWith('Americas');
  });

  it('should combine filter when both query and region are provided', async () => {
    const americasCountries = mockCountriesList.filter(c => c.region === 'Americas');
    vi.mocked(mockRepository.filterByRegion).mockResolvedValue(americasCountries);

    const useCase = new GetCountries(mockRepository);
    const result = await useCase.execute({ query: 'Colombia', region: 'Americas' });

    // El use case filtra client-side por nombre después de obtener la región
    expect(result.every(c => c.names.common.toLowerCase().includes('colombia'))).toBe(true);
    expect(mockRepository.filterByRegion).toHaveBeenCalledWith('Americas');
    expect(mockRepository.searchCountries).not.toHaveBeenCalled();
  });
});
