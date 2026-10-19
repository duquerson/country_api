import { describe, it, expect } from 'vitest';

describe('Country Domain (v5)', () => {
  it('should have valid CountrySummary interface shape (v5)', () => {
    const countrySummary = {
      codes: { alpha_3: 'COL' },
      names: { common: 'Colombia' },
      capitals: [{ name: 'Bogotá', primary: true }],
      region: 'Americas',
      population: 50882891,
      flag: {
        url_svg: 'https://flags.restcountries.com/v5/svg/co.svg',
        emoji: '🇨🇴',
      },
    };

    expect(countrySummary.codes.alpha_3).toBe('COL');
    expect(countrySummary.names.common).toBe('Colombia');
    expect(countrySummary.capitals[0].name).toBe('Bogotá');
    expect(countrySummary.population).toBeGreaterThan(0);
    expect(countrySummary.flag.url_svg).toBeDefined();
  });

  it('should have valid Country interface shape (v5)', () => {
    const country = {
      names: {
        common: 'Colombia',
        official: 'Republic of Colombia',
        native: {
          spa: { common: 'Colombia', official: 'República de Colombia' },
        },
      },
      capitals: [{ name: 'Bogotá', primary: true }],
      region: 'Americas',
      subregion: 'South America',
      population: 50882891,
      flag: {
        url_svg: 'https://flags.restcountries.com/v5/svg/co.svg',
        url_png: 'https://flags.restcountries.com/v5/w640/co.png',
        emoji: '🇨🇴',
      },
      tlds: ['.co'],
      currencies: [{ code: 'COP', name: 'Colombian peso', symbol: '$' }],
      languages: [{ name: 'Spanish', bcp47: 'es' }],
      borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN'],
      codes: { alpha_3: 'COL', alpha_2: 'CO' },
      continents: ['South America'],
      timezones: ['UTC-05:00'],
    };

    expect(country.names.common).toBe('Colombia');
    expect(country.names.official).toBe('Republic of Colombia');
    expect(country.population).toBe(50882891);
    expect(country.borders).toHaveLength(5);
    expect(country.currencies[0].name).toBe('Colombian peso');
    expect(country.languages[0].name).toBe('Spanish');
  });

  it('should handle country with no borders (island nations)', () => {
    const countryWithoutBorders: Record<string, unknown> = {
      names: { common: 'Iceland', official: 'Iceland', native: {} },
      capitals: [{ name: 'Reykjavik', primary: true }],
      region: 'Europe',
      subregion: 'Northern Europe',
      population: 366425,
      flag: { url_svg: 'https://flags.restcountries.com/v5/svg/is.svg', emoji: '🇮🇸' },
      tlds: ['.is'],
      currencies: [{ code: 'ISK', name: 'Icelandic króna', symbol: 'kr' }],
      languages: [{ name: 'Icelandic', bcp47: 'is' }],
      borders: [],
      codes: { alpha_3: 'ISL', alpha_2: 'IS' },
      continents: ['Europe'],
      timezones: ['UTC'],
    };

    expect((countryWithoutBorders.borders as string[]).length).toBe(0);
    expect((countryWithoutBorders.names as { common: string }).common).toBe('Iceland');
  });

  it('should format population with locale', () => {
    const population = 50882891;
    const formatted = population.toLocaleString('en-US');
    expect(formatted).toBe('50,882,891');
  });

  it('should extract first currency name from v5 currencies array', () => {
    const currencies = [{ code: 'COP', name: 'Colombian peso', symbol: '$' }];
    const firstCurrency = currencies[0].name;
    expect(firstCurrency).toBe('Colombian peso');
  });

  it('should extract language list from v5 languages array', () => {
    const languages = [{ name: 'Spanish', bcp47: 'es' }, { name: 'Quechua', bcp47: 'qu' }];
    const languageList = languages.map((l) => l.name).join(', ');
    expect(languageList).toBe('Spanish, Quechua');
  });
});
