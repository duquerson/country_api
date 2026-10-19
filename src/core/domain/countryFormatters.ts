// Helpers seguros para acceder a propiedades anidadas de Country (v5)
import type { Country } from './types';

// v5: names.native -> Record<langCode, { common, official }>
export const getFirstNativeName = (country: Country): string => {
    const native = country.names.native;
    if (!native) return 'N/A';
    const key = Object.keys(native)[0];
    return key ? native[key].common : 'N/A';
};

// v5: currencies es un array [{ code, name, symbol }]
export const getFirstCurrency = (country: Country): string => {
    const currencies = country.currencies;
    if (!currencies || currencies.length === 0) return 'N/A';
    return currencies[0].name ?? 'N/A';
};

// v5: languages es un array [{ name, bcp47 }]
export const getLanguages = (country: Country): string => {
    const langs = country.languages;
    if (!langs || langs.length === 0) return 'N/A';
    return langs.map((l) => l.name).join(', ');
};

export const formatNumber = (num: number): string =>
    new Intl.NumberFormat('en-US').format(num);
