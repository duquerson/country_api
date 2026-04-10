import { z } from 'zod';

// --- Domain Schemas ---

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
  png: z.string().url().optional(),
  alt: z.string().optional(),
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

// --- Action / Input Schemas ---

export const countryCodeSchema = z.object({
  code: z.string()
    .min(1, 'Country code is required')
    .max(3, 'Country code must be 3 characters')
    .regex(/^[A-Za-z]{3}$/, 'Country code must be 3 letters'),
});

export const searchQuerySchema = z.object({
  query: z.string()
    .max(100, 'Search query too long')
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'Invalid search characters')
    .optional()
    .or(z.literal('')),
});

export const regionSchema = z.object({
  region: z.enum(
    ['Africa', 'Americas', 'Antarctic', 'Antarctic Ocean', 'Asia', 'Europe', 'Oceania', 'Polar'],
    { message: 'Invalid region' }
  ).optional().or(z.literal('')),
});

// Combined filter schema
export const countryFilterSchema = z.object({
  query: z.string().optional(),
  region: z.string().optional(),
});
