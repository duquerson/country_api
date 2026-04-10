// Centraliza las URLs y campos de API REST Countries
const DEFAULT_API_URL = 'https://restcountries.com/v3.1';

const ALLOWED_DOMAINS = ['restcountries.com'];

const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    return ALLOWED_DOMAINS.some((domain) => {
      const d = domain.toLowerCase();
      return hostname === d || hostname.endsWith(`.${d}`);
    });
  } catch {
    return false;
  }
};

const getApiUrl = (): string => {
  const envUrl = import.meta.env.PUBLIC_API_URL;
  if (!envUrl) return DEFAULT_API_URL;

  if (!isValidUrl(envUrl)) {
    console.warn('[API Config] Invalid API URL, using default');
    return DEFAULT_API_URL;
  }
  return envUrl;
};

export const API_URL = getApiUrl();

export const COUNTRY_FIELDS = {
  SUMMARY: 'name,capital,region,population,flags,cca3',
  DETAIL:
    'name,capital,region,population,flags,cca3,borders,currencies,languages,subregion,tld,nativeName',
};
