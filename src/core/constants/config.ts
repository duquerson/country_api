// Configuraciones globales del sistema
export const CONFIG = {
  // UI
  ABOVE_FOLD_THRESHOLD: 8,
  SKELETON_COUNT: 12,
  ANIMATION_DELAY_STEP: 0.05,
  
  // Performance
  SEARCH_DEBOUNCE_MS: 300,
  
  // Layout
  
  // Data
  REGIONS: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const,
  MAX_QUERY_LENGTH: 100,
} as const;
