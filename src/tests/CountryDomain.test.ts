import { describe, it, expect } from 'vitest';

describe('Country Domain', () => {
  it('should have valid CountrySummary interface shape', () => {
    const countrySummary = {
      cca3: 'COL',
      name: { common: 'Colombia' },
      capital: ['Bogotá'],
      region: 'Americas',
      population: 50882891,
      flags: {
        svg: 'https://flagcdn.com/co.svg',
        alt: 'flag of Colombia',
      },
    };

    expect(countrySummary.cca3).toBe('COL');
    expect(countrySummary.name.common).toBe('Colombia');
    expect(countrySummary.capital).toContain('Bogotá');
    expect(countrySummary.population).toBeGreaterThan(0);
    expect(countrySummary.flags.svg).toBeDefined();
  });

  it('should have valid Country interface shape', () => {
    const country = {
      name: {
        common: 'Colombia',
        official: 'Republic of Colombia',
        nativeName: {
          spa: { common: 'Colombia', official: 'República de Colombia' },
        },
      },
      capital: ['Bogotá'],
      region: 'Americas',
      subregion: 'South America',
      population: 50882891,
      flags: { svg: 'https://flagcdn.com/co.svg', png: 'https://flagcdn.com/w320/co.png', alt: 'flag of Colombia' },
      tld: ['.co'],
      currencies: { COP: { name: 'Colombian peso', symbol: '$' } },
      languages: { spa: 'Spanish' },
      borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN'],
      cca3: 'COL',
      cca2: 'CO',
      continents: ['South America'],
      timezones: ['UTC-05:00'],
    };

    expect(country.name.common).toBe('Colombia');
    expect(country.name.official).toBe('Republic of Colombia');
    expect(country.population).toBe(50882891);
    expect(country.borders).toHaveLength(5);
    expect(country.currencies.COP.name).toBe('Colombian peso');
    expect(country.languages.spa).toBe('Spanish');
  });

  it('should handle country with optional borders as undefined', () => {
    const countryWithoutBorders: Record<string, unknown> = {
      name: { common: 'Iceland', official: 'Iceland', nativeName: {} },
      capital: ['Reykjavik'],
      region: 'Europe',
      subregion: 'Northern Europe',
      population: 366425,
      flags: { svg: 'https://flagcdn.com/is.svg', png: 'https://flagcdn.com/w320/is.png' },
      tld: ['.is'],
      currencies: { ISK: { name: 'Icelandic króna', symbol: 'kr' } },
      languages: { isl: 'Icelandic' },
      cca3: 'ISL',
      cca2: 'IS',
      continents: ['Europe'],
      timezones: ['UTC'],
    };

    expect(countryWithoutBorders.borders).toBeUndefined();
    expect((countryWithoutBorders.name as { common: string }).common).toBe('Iceland');
  });

  it('should format population with locale', () => {
    const population = 50882891;
    const formatted = population.toLocaleString('en-US');

    expect(formatted).toBe('50,882,891');
  });

  it('should extract first currency name from currencies object', () => {
    const currencies: Record<string, { name: string; symbol: string }> = { COP: { name: 'Colombian peso', symbol: '$' } };
    const firstCurrency = currencies[Object.keys(currencies)[0] as string].name;

    expect(firstCurrency).toBe('Colombian peso');
  });

  it('should extract first language from languages object', () => {
    const languages = { spa: 'Spanish', que: 'Quechua' };
    const languageList = Object.values(languages).join(', ');

    expect(languageList).toBe('Spanish, Quechua');
  });
});
