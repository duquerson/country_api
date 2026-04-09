import type { CountryRepository } from '../interfaces/Repository';
import type { CountrySummary } from '../domain/Country';

export class GetBorderCountries {
  constructor(private repository: CountryRepository) {}

  async execute(borderCodes: string[]): Promise<CountrySummary[]> {
    if (!borderCodes || borderCodes.length === 0) return [];
    const results = await Promise.all(
      borderCodes.map(code => this.repository.getCountryByCode(code))
    );
    return results.map(c => ({
      cca3: c.cca3,
      common: c.name.common,
      capital: c.capital,
      region: c.region,
      population: c.population,
      flags: { svg: c.flags.svg, alt: c.flags.alt },
    }));
  }
}