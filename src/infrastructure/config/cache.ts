// Configuración centralizada para el sistema de caché
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutos
  COUNTRIES_ALL: 'countries:all',
  COUNTRY_PREFIX: 'country:',
} as const;
