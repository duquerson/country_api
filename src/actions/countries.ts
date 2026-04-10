import { defineAction } from 'astro:actions';
import { getCountryByCode, getCountries } from '../core/di';
import { countryCodeSchema, countryFilterSchema } from '../core/domain/schemas';

export const countries = {
	getCountries: defineAction({
		input: countryFilterSchema,
		handler: async (filters) => {
			try {
				return await getCountries.execute(filters);
			} catch (e) {
				console.error('[Action: getCountries] Internal Error:', e);
				throw new Error('An error occurred while fetching countries');
			}
		}
	}),

	getByCode: defineAction({
		input: countryCodeSchema,
		handler: async ({ code }) => {
			try {
				return await getCountryByCode.execute(code.toUpperCase());
			} catch (e) {
				console.error(`[Action: getByCode] Internal Error for code ${code}:`, e);
				throw new Error('An error occurred while fetching country details');
			}
		}
	}),


};
