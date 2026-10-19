// Centraliza las URLs y campos de API REST Countries v5
const DEFAULT_API_URL = 'https://api.restcountries.com/countries/v5';

const ALLOWED_DOMAINS = ['api.restcountries.com'];

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
  // NUNCA usar PUBLIC_ — la key es solo del servidor
  const envUrl = import.meta.env.API_URL;
  if (!envUrl) return DEFAULT_API_URL;

  if (!isValidUrl(envUrl)) {
    console.warn('[API Config] Invalid API URL, using default');
    return DEFAULT_API_URL;
  }
  return envUrl;
};

export const API_URL = getApiUrl();

// La clave de API se lee solo en el servidor (sin prefijo PUBLIC_)
export const API_KEY: string = import.meta.env.RESTCOUNTRIES_API_KEY ?? '';

// Nombres de campos v5 (param ?response_fields=)
export const COUNTRY_FIELDS = {
  SUMMARY: 'names.common,capitals,region,population,flag,codes.alpha_3',
  DETAIL:
    'names,capitals,region,population,flag,codes,borders,currencies,languages,subregion,tlds',
};

export const HTTP_TIMEOUTS = {
  STANDARD: 10000,
  RETRIES: 3,
  RETRY_DELAY: 1000,
};
