import { describe, it, expect } from 'vitest';
import * as schemas from '../core/domain/schemas';
import { getMockCountries } from './fixtures/mockData';

const mockCountries = getMockCountries();

describe('Domain - Validation Schemas', () => {
  describe('countryCodeSchema', () => {
    it('should accept valid 3-letter code', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'USA' });
      expect(result.success).toBe(true);
    });

    it('should reject code with numbers', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'US1' });
      expect(result.success).toBe(false);
    });
  });


  describe('countrySummarySchema', () => {
    it('should parse valid country summary', () => {
      const validCountry = mockCountries[0];
      const summary = {
        cca3: validCountry.cca3,
        name: { common: validCountry.name.common },
        capital: validCountry.capital,
        region: validCountry.region,
        population: validCountry.population,
        flags: { svg: validCountry.flags.svg, alt: validCountry.flags.alt },
      };
      const result = schemas.countrySummarySchema.safeParse(summary);
      expect(result.success).toBe(true);
    });
  });
});
