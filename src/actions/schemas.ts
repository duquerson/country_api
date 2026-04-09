import { z } from 'astro/zod';

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
  region: z.enum(['Africa', 'Americas', 'Antarctic', 'Antarctic Ocean', 'Asia', 'Europe', 'Oceania', 'Polar'], {
    errorMap: () => ({ message: 'Invalid region' }),
  }),
});

export type CountryCodeInput = z.infer<typeof countryCodeSchema>;
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type RegionInput = z.infer<typeof regionSchema>;

export const nativeNameSchema = z.object({
  common: z.string(),
  official: z.string(),
});

export const currencySchema = z.object({
  name: z.string(),
  symbol: z.string(),
});

export const flagSchema = z.object({
  svg: z.string().url(),
  png: z.string().url(),
  alt: z.string().optional(),
});

export const countrySummarySchema = z.object({
  cca3: z.string(),
  name: z.object({ common: z.string() }),
  capital: z.array(z.string()).default([]),
  region: z.string(),
  population: z.number().int().min(0),
  flags: z.object({ svg: z.string().url(), alt: z.string().optional() }),
});

export const countrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: z.record(z.string(), nativeNameSchema),
  }),
  capital: z.array(z.string()).default([]),
  region: z.string(),
  subregion: z.string().optional(),
  population: z.number().int().min(0),
  flags: flagSchema,
  tld: z.array(z.string()).default([]),
  currencies: z.record(z.string(), currencySchema).optional(),
  languages: z.record(z.string(), z.string()).optional(),
  borders: z.array(z.string()).default([]),
  cca3: z.string(),
  cca2: z.string().optional(),
  continents: z.array(z.string()).default([]),
  timezones: z.array(z.string()).default([]),
});

export const countryListSchema = z.array(countrySchema);
export const countrySummaryListSchema = z.array(countrySummarySchema);

export type CountrySummary = z.infer<typeof countrySummarySchema>;
export type CountrySummaryParsed = z.infer<typeof countrySummaryListSchema>;
export type Country = z.infer<typeof countrySchema>;

export function safeParseCountrySummaryList(data: unknown) {
  return countrySummaryListSchema.safeParse(data);
}

export function safeParseCountryList(data: unknown) {
  return countryListSchema.safeParse(data);
}
