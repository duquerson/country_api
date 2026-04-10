import type { CountryRepository } from '../interfaces/Repository';
import type { CountrySummary } from '../domain/types';

export interface GetCountriesFilters {
  query?: string;
  region?: string;
}

export class GetCountries {
  constructor(private repository: CountryRepository) {}

  async execute(filters: GetCountriesFilters = {}): Promise<CountrySummary[]> {
    const { query, region } = filters;

    // Both query and region
    if (query && region) {
      const regionResults = await this.repository.filterByRegion(region);
      const searchTerm = query.toLowerCase();
      return regionResults.filter(c => 
        c.name.common.toLowerCase().includes(searchTerm)
      );
    }

    // Only region
    if (region) {
      return this.repository.filterByRegion(region);
    }

    // Only query
    if (query) {
      return this.repository.searchCountries(query);
    }

    // Default: all
    return this.repository.getAllCountries();
  }
}
