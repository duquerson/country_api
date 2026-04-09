import type { CountryRepository } from '../interfaces/Repository';
import type { CountrySummary } from '../domain/Country';

export class SearchCountries {
  constructor(private repository: CountryRepository) {}

  async execute(query: string): Promise<CountrySummary[]> {
    if (!query.trim()) return this.repository.getAllCountries();
    return this.repository.searchCountries(query);
  }
}