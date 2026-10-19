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

    // Ambos: filtrar por región y luego buscar por nombre en el resultado
    if (query && region) {
      const regionResults = await this.repository.filterByRegion(region);
      const searchTerm = query.toLowerCase();
      // v5: names.common
      return regionResults.filter(c =>
        c.names.common.toLowerCase().includes(searchTerm)
      );
    }

    // Solo región
    if (region) {
      return this.repository.filterByRegion(region);
    }

    // Solo búsqueda
    if (query) {
      return this.repository.searchCountries(query);
    }

    // Todos los países
    return this.repository.getAllCountries();
  }
}
