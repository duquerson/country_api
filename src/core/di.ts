import repository from '../infrastructure/repositories/CountryRepositoryImpl';
import type { CountryRepository } from './interfaces/Repository';
import { GetCountryByCode } from './use-cases/GetCountryByCode';
import { SearchCountries } from './use-cases/SearchCountries';
import { FilterByRegion } from './use-cases/FilterByRegion';

export const getCountryByCode = new GetCountryByCode(repository);
export const searchCountries = new SearchCountries(repository);
export const filterByRegion = new FilterByRegion(repository);

export type { CountryRepository };