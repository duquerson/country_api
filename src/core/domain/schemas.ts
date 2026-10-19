import { z } from 'zod';

// --- Schemas de dominio (estructura REST Countries v5) ---

// v5: names.native -> Record<langCode, { common, official }>
export const nativeNameSchema = z.object({
  common: z.string(),
  official: z.string(),
});

// v5: currencies es un array [{ code, name, symbol }]
export const currencySchema = z.object({
  code: z.string(),
  name: z.string(),
  symbol: z.string(),
});

// v5: languages es un array [{ name, bcp47 }]
export const languageSchema = z.object({
  name: z.string(),
  bcp47: z.string().optional(),
});

// v5: capitals es un array [{ name, primary, coordinates? }]
export const capitalSchema = z.object({
  name: z.string(),
  primary: z.boolean().optional(),
});

// v5: flag -> { url_svg, url_png, emoji }
export const flagSchema = z.object({
  url_svg: z.string().url(),
  url_png: z.string().url().optional(),
  emoji: z.string().optional(),
});

// v5: codes -> { alpha_2, alpha_3, ... }
export const codesSchema = z.object({
  alpha_3: z.string(),
  alpha_2: z.string().optional(),
});

// Schema completo para la vista de detalle (v5)
export const countrySchema = z.object({
  names: z.object({
    common: z.string(),
    official: z.string(),
    native: z.record(z.string(), nativeNameSchema).optional(),
  }),
  capitals: z.array(capitalSchema).default([]),
  region: z.string(),
  subregion: z.string().optional(),
  population: z.number().int().min(0),
  flag: flagSchema,
  tlds: z.array(z.string()).default([]),
  currencies: z.array(currencySchema).optional(),
  languages: z.array(languageSchema).optional(),
  borders: z.array(z.string()).default([]),
  codes: codesSchema,
  continents: z.array(z.string()).default([]),
  timezones: z.array(z.string()).default([]),
});

// Schema resumido para la lista/búsqueda/filtro (v5)
export const countrySummarySchema = z.object({
  codes: z.object({ alpha_3: z.string() }),
  names: z.object({ common: z.string() }),
  capitals: z.array(capitalSchema).default([]),
  region: z.string(),
  population: z.number().int().min(0),
  flag: z.object({ url_svg: z.string().url(), emoji: z.string().optional() }),
});

// Wrapper de respuesta v5: { data: [...], meta: {...} }
export const apiResponseSchema = z.object({
  data: z.array(countrySchema),
});

export const apiSummaryResponseSchema = z.object({
  data: z.array(countrySummarySchema),
});

export const countryListSchema = z.array(countrySchema);
export const countrySummaryListSchema = z.array(countrySummarySchema);

// --- Schemas de entrada para Actions ---

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

// Schema combinado de filtros
export const countryFilterSchema = z.object({
  query: z.string().optional(),
  region: z.string().optional(),
});
