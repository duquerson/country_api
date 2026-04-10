import { z } from 'zod';

export const nativeNameSchema = z.object({
  common: z.string(),
  official: z.string(),
});

export const currencySchema = z.object({
  name: z.string(),
  symbol: z.string(),
});

export const languageSchema = z.string();

export const flagSchema = z.object({
  svg: z.string().url(),
  png: z.string().url(),
  alt: z.string().optional(),
});

export const countrySchema = z
  .object({
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
    languages: z.record(z.string(), languageSchema).optional(),
    borders: z.array(z.string()).default([]),
    cca3: z.string(),
    cca2: z.string().optional(),
    continents: z.array(z.string()).default([]),
    timezones: z.array(z.string()).default([]),
  });

export const countrySummarySchema = z.object({
  cca3: z.string(),
  name: z.object({ common: z.string() }),
  capital: z.array(z.string()).default([]),
  region: z.string(),
  population: z.number().int().min(0),
  flags: z.object({ svg: z.string().url(), alt: z.string().optional() }),
});

export const countryListSchema = z.array(countrySchema);
export const countrySummaryListSchema = z.array(countrySummarySchema);

export type Country = z.infer<typeof countrySchema>;
export type CountrySummaryFromApi = z.infer<typeof countrySummarySchema>;
export type CountrySummaryParsed = z.infer<typeof countrySummaryListSchema>;

export function safeParseCountrySummaryList(data: unknown) {
  return countrySummaryListSchema.safeParse(data);
}


export function parseCountryList(data: unknown): z.infer<typeof countryListSchema> {
  return countryListSchema.parse(data);
}

export function parseCountrySummary(data: unknown): z.infer<typeof countrySummarySchema> {
  return countrySummarySchema.parse(data);
}

export function safeParseCountry(data: unknown) {
  return countrySchema.safeParse(data);
}

export function safeParseCountryList(data: unknown) {
  return countryListSchema.safeParse(data);
}