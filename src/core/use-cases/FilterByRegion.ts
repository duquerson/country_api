import type { CountryRepository } from '../interfaces/Repository';
import type { CountrySummary } from '../domain/Country';

export class FilterByRegion {
  constructor(private repository: CountryRepository) {}

  async execute(region: string): Promise<CountrySummary[]> {
    if (!region) return this.repository.getAllCountries();
    return this.repository.filterByRegion(region);
  }
}