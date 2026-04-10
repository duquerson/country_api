import { z } from 'zod';
import { 
  countrySchema, 
  countrySummarySchema, 
} from './schemas';

// --- Domain Types ---

export type Country = z.infer<typeof countrySchema>;
export type CountrySummary = z.infer<typeof countrySummarySchema>;

// Helper to convert Country to Summary
export function toCountrySummary(country: Country): CountrySummary {
  return {
    cca3: country.cca3,
    name: { common: country.name.common },
    capital: country.capital,
    region: country.region,
    population: country.population,
    flags: { svg: country.flags.svg, alt: country.flags.alt },
  };
}
