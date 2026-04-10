// Mock data for tests - inline fixtures
import type { Country } from '../../core/domain/types';

export function getMockCountries(): Country[] {
  return [
    {
      cca3: 'COL',
      cca2: 'CO',
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
      flags: {
        svg: 'https://flagcdn.com/co.svg',
        alt: 'The flag of Colombia',
      },
      tld: ['.co'],
      currencies: { COP: { name: 'Colombian peso', symbol: '$' } },
      languages: { spa: 'Spanish' },
      borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN'],
      continents: ['South America'],
      timezones: ['UTC-05:00'],
    },
    {
      cca3: 'DEU',
      cca2: 'DE',
      name: {
        common: 'Germany',
        official: 'Federal Republic of Germany',
        nativeName: {
          deu: { common: 'Deutschland', official: 'Bundesrepublik Deutschland' },
        },
      },
      capital: ['Berlin'],
      region: 'Europe',
      subregion: 'Western Europe',
      population: 83240525,
      flags: {
        svg: 'https://flagcdn.com/de.svg',
        alt: 'The flag of Germany',
      },
      tld: ['.de'],
      currencies: { EUR: { name: 'Euro', symbol: '€' } },
      languages: { deu: 'German' },
      borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
      continents: ['Europe'],
      timezones: ['UTC+01:00'],
    },
  ];
}
