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

  describe('searchQuerySchema', () => {
    it('should accept valid search query', () => {
      const result = schemas.searchQuerySchema.safeParse({ query: 'spain' });
      expect(result.success).toBe(true);
    });

    it('should accept empty query (as intentional for "all")', () => {
      const result = schemas.searchQuerySchema.safeParse({ query: '' });
      expect(result.success).toBe(true);
    });

    it('should reject query exceeding max length', () => {
      const longQuery = 'a'.repeat(101);
      const result = schemas.searchQuerySchema.safeParse({ query: longQuery });
      expect(result.success).toBe(false);
    });
  });

  describe('regionSchema', () => {
    it('should accept Africa', () => {
      const result = schemas.regionSchema.safeParse({ region: 'Africa' });
      expect(result.success).toBe(true);
    });

    it('should accept empty region (as intentional for "all")', () => {
      const result = schemas.regionSchema.safeParse({ region: '' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid region', () => {
      const result = schemas.regionSchema.safeParse({ region: 'InvalidRegion' });
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
