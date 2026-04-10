import { z } from 'astro/zod';
export {
  safeParseCountryList,
  safeParseCountrySummaryList,
  countrySchema,
  countryListSchema,
  countrySummarySchema,
  countrySummaryListSchema,
  type Country,
  type CountrySummaryFromApi as CountrySummary,
  type CountrySummaryParsed,
} from '../core/domain/CountrySchema';

export const countryCodeSchema = z.object({
  code: z.string()
    .min(1, 'Country code is required')
    .max(3, 'Country code must be 3 characters')
    .regex(/^[A-Za-z]{3}$/, 'Country code must be 3 letters'),
});

export const searchQuerySchema = z.object({
  query: z.string()
    .min(1, 'Search query is required')
    .max(100, 'Search query too long')
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'Invalid search characters'),
});

export const regionSchema = z.object({
  region: z.enum(
    ['Africa', 'Americas', 'Antarctic', 'Antarctic Ocean', 'Asia', 'Europe', 'Oceania', 'Polar'],
    { message: 'Invalid region' }
  ),
});

export type CountryCodeInput = z.infer<typeof countryCodeSchema>;
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type RegionInput = z.infer<typeof regionSchema>;
