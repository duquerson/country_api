// Helpers seguros para acceder a propiedades anidadas de Country
import type { Country } from './types';

export const getFirstNativeName = (country: Country): string => {
    const key = Object.keys(country.name.nativeName || {})[0];
    return key ? country.name.nativeName[key].common : 'N/A';
};

export const getFirstCurrency = (country: Country): string => {
    const key = Object.keys(country.currencies || {})[0];
    return key ? (country.currencies?.[key]?.name ?? 'N/A') : 'N/A';
};

export const getLanguages = (country: Country): string => {
    return country.languages ? Object.values(country.languages).join(', ') : 'N/A';
};
