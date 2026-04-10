import repository from '../infrastructure/repositories/CountryRepositoryImpl';
import { GetCountryByCode } from './use-cases/GetCountryByCode';
import { GetCountries } from './use-cases/GetCountries';

export const getCountryByCode = new GetCountryByCode(repository);
export const getCountries = new GetCountries(repository);