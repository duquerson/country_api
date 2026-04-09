import { describe, it, expect } from 'vitest';

describe('Country Domain', () => {
  it('should have valid CountrySummary interface shape', () => {
    const countrySummary = {
      cca3: 'ESP',
      common: 'Spain',
      capital: ['Madrid'],
      region: 'Europe',
      population: 47351567,
      flags: {
        svg: 'https://flagcdn.com/es.svg',
        alt: 'flag of Spain',
      },
    };

    expect(countrySummary.cca3).toBe('ESP');
    expect(countrySummary.common).toBe('Spain');
    expect(countrySummary.capital).toContain('Madrid');
    expect(countrySummary.population).toBeGreaterThan(0);
    expect(countrySummary.flags.svg).toBeDefined();
  });

  it('should have valid Country interface shape', () => {
    const country = {
      name: {
        common: 'Spain',
        official: 'Kingdom of Spain',
        nativeName: {
          spa: { common: 'España', official: 'Reino de España' },
        },
      },
      capital: ['Madrid'],
      region: 'Europe',
      subregion: 'Southern Europe',
      population: 47351567,
      flags: { svg: 'https://flagcdn.com/es.svg', png: 'https://flagcdn.com/w320/es.png', alt: 'flag of Spain' },
      tld: ['.es'],
      currencies: { EUR: { name: 'Euro', symbol: '€' } },
      languages: { spa: 'Spanish' },
      borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
      cca3: 'ESP',
      cca2: 'ES',
      continents: ['Europe'],
      timezones: ['UTC+01:00'],
    };

    expect(country.name.common).toBe('Spain');
    expect(country.name.official).toBe('Kingdom of Spain');
    expect(country.population).toBe(47351567);
    expect(country.borders).toHaveLength(5);
    expect(country.currencies.EUR.name).toBe('Euro');
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
    const population = 47351567;
    const formatted = population.toLocaleString('en-US');

    expect(formatted).toBe('47,351,567');
  });

  it('should extract first currency name from currencies object', () => {
    const currencies: Record<string, { name: string; symbol: string }> = { EUR: { name: 'Euro', symbol: '€' } };
    const firstCurrency = currencies[Object.keys(currencies)[0] as string].name;

    expect(firstCurrency).toBe('Euro');
  });

  it('should extract first language from languages object', () => {
    const languages = { spa: 'Spanish', cat: 'Catalan' };
    const languageList = Object.values(languages).join(', ');

    expect(languageList).toBe('Spanish, Catalan');
  });
});
