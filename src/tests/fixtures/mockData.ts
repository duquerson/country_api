// Mock data para tests - fixtures en estructura REST Countries v5
import type { Country } from '../../core/domain/types';

export function getMockCountries(): Country[] {
  return [
    {
      codes: { alpha_3: 'COL', alpha_2: 'CO' },
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
      continents: ['South America'],
      timezones: ['UTC-05:00'],
    },
    {
      codes: { alpha_3: 'DEU', alpha_2: 'DE' },
      names: {
        common: 'Germany',
        official: 'Federal Republic of Germany',
        native: {
          deu: { common: 'Deutschland', official: 'Bundesrepublik Deutschland' },
        },
      },
      capitals: [{ name: 'Berlin', primary: true }],
      region: 'Europe',
      subregion: 'Western Europe',
      population: 83240525,
      flag: {
        url_svg: 'https://flags.restcountries.com/v5/svg/de.svg',
        url_png: 'https://flags.restcountries.com/v5/w640/de.png',
        emoji: '🇩🇪',
      },
      tlds: ['.de'],
      currencies: [{ code: 'EUR', name: 'Euro', symbol: '€' }],
      languages: [{ name: 'German', bcp47: 'de' }],
      borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
      continents: ['Europe'],
      timezones: ['UTC+01:00'],
    },
  ];
}
