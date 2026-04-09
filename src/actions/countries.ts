import { defineAction } from 'astro:actions';
import CountryRepositoryImpl from '../infrastructure/repositories/CountryRepositoryImpl';
import { mapAppErrorToActionError } from './errors';
import { countryCodeSchema, searchQuerySchema, regionSchema } from './schemas';

export const countries = {
  getAll: defineAction({
    input: countryCodeSchema.omit({ code: true }).optional(),
    handler: async () => {
      try {
        return await CountryRepositoryImpl.getAllCountries();
      } catch (e) {
        const errorInfo = mapAppErrorToActionError(e);
        throw new Error(errorInfo.message);
      }
    }
  }),
  
  getByCode: defineAction({
    input: countryCodeSchema,
    handler: async ({ code }) => {
      try {
        return await CountryRepositoryImpl.getCountryByCode(code.toUpperCase());
      } catch (e) {
        const errorInfo = mapAppErrorToActionError(e);
        throw new Error(errorInfo.message);
      }
    }
  }),
  
  search: defineAction({
    input: searchQuerySchema,
    handler: async ({ query }) => {
      try {
        return await CountryRepositoryImpl.searchCountries(query);
      } catch (e) {
        const errorInfo = mapAppErrorToActionError(e);
        throw new Error(errorInfo.message);
      }
    }
  }),
  
  filterByRegion: defineAction({
    input: regionSchema,
    handler: async ({ region }) => {
      try {
        return await CountryRepositoryImpl.filterByRegion(region);
      } catch (e) {
        const errorInfo = mapAppErrorToActionError(e);
        throw new Error(errorInfo.message);
      }
    }
  }),
};
