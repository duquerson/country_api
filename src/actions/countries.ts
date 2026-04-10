import { defineAction } from 'astro:actions';
import { getCountryByCode, getCountries } from '../core/di';
import { handleError } from '../core/domain/errors';
import { countryCodeSchema, countryFilterSchema } from '../core/domain/schemas';

export const countries = {
  getCountries: defineAction({
    input: countryFilterSchema,
    handler: async (filters) => {
      try {
        return await getCountries.execute(filters);
      } catch (e) {
        const error = handleError(e, 'getCountries Action');
        throw new Error(error.message);
      }
    }
  }),
  
  getByCode: defineAction({
    input: countryCodeSchema,
    handler: async ({ code }) => {
      try {
        return await getCountryByCode.execute(code.toUpperCase());
      } catch (e) {
        const error = handleError(e, 'getByCode Action');
        throw new Error(error.message);
      }
    }
  }),

  // For backward compatibility or specific needs if any, 
  // but unified getCountries handles getAll, search, and filter.
};
