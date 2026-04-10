import { defineAction } from 'astro:actions';
import { getCountryByCode, searchCountries, filterByRegion } from '../core/di';
import { mapAppErrorToActionError } from './errors';
import { countryCodeSchema, searchQuerySchema, regionSchema } from './schemas';

export const countries = {
  getAll: defineAction({
    input: countryCodeSchema.omit({ code: true }).optional(),
    handler: async () => {
      try {
        return await searchCountries.execute('');
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
        return await getCountryByCode.execute(code.toUpperCase());
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
        return await searchCountries.execute(query);
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
        return await filterByRegion.execute(region);
      } catch (e) {
        const errorInfo = mapAppErrorToActionError(e);
        throw new Error(errorInfo.message);
      }
    }
  }),
};
