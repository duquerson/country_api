import type { Country, CountrySummary } from '../domain/Country';

export type { Country, CountrySummary } from '../domain/Country';

export interface CountryRepository {
  getAllCountries(): Promise<CountrySummary[]>;
  getCountryByCode(code: string): Promise<Country>;
  searchCountries(query: string): Promise<CountrySummary[]>;
  filterByRegion(region: string): Promise<CountrySummary[]>;
}