import { z } from 'zod';
import { 
  countrySchema, 
  countrySummarySchema, 
} from './schemas';

// --- Domain Types (inferidos de los schemas v5) ---

export type Country = z.infer<typeof countrySchema>;
export type CountrySummary = z.infer<typeof countrySummarySchema>;

// Convierte un Country completo a CountrySummary para listas
export function toCountrySummary(country: Country): CountrySummary {
  return {
    codes: { alpha_3: country.codes.alpha_3 },
    names: { common: country.names.common },
    capitals: country.capitals,
    region: country.region,
    population: country.population,
    flag: { url_svg: country.flag.url_svg, emoji: country.flag.emoji },
  };
}
