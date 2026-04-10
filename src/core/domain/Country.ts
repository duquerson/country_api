import { z } from 'zod';
import { countrySchema } from './CountrySchema';

export type Country = z.infer<typeof countrySchema>;

export interface CountrySummary {
  cca3: string;
  common: string;
  capital: string[];
  region: string;
  population: number;
  flags: {
    svg: string;
    alt?: string;
  };
}

export function toCountrySummary(country: Country): CountrySummary {
  return {
    cca3: country.cca3,
    common: country.name.common,
    capital: country.capital,
    region: country.region,
    population: country.population,
    flags: { svg: country.flags.svg, alt: country.flags.alt },
  };
}
