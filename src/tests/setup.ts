import { vi } from 'vitest';

export const actions = {
  countries: {
    getCountries: vi.fn(),
    getByCode: vi.fn(),
  },
};
