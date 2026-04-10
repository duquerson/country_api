import { describe, it, expect } from 'vitest';
import * as schemas from '../actions/schemas';
import { getMockCountries } from './fixtures/mockData';

const mockCountries = getMockCountries();

describe('Actions - Input Validation Schemas', () => {
  describe('countryCodeSchema', () => {
    it('should accept valid 3-letter code', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'USA' });
      expect(result.success).toBe(true);
    });

    it('should accept lowercase code', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'esp' });
      expect(result.success).toBe(true);
    });

    it('should reject code with numbers', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'US1' });
      expect(result.success).toBe(false);
    });

    it('should reject code with wrong length', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'US' });
      expect(result.success).toBe(false);
    });

    it('should reject empty code', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: '' });
      expect(result.success).toBe(false);
    });

    it('should reject code with special characters', () => {
      const result = schemas.countryCodeSchema.safeParse({ code: 'US!' });
      expect(result.success).toBe(false);
    });

    it('should validate real country codes from data.json', () => {
      mockCountries.slice(0, 10).forEach((country: any) => {
        const result = schemas.countryCodeSchema.safeParse({ code: country.cca3 });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('searchQuerySchema', () => {
    it('should accept valid search query', () => {
      const result = schemas.searchQuerySchema.safeParse({ query: 'spain' });
      expect(result.success).toBe(true);
    });

    it('should reject query with special characters', () => {
      const result = schemas.searchQuerySchema.safeParse({ query: 'spain@123' });
      expect(result.success).toBe(false);
    });

    it('should reject empty query', () => {
      const result = schemas.searchQuerySchema.safeParse({ query: '' });
      expect(result.success).toBe(false);
    });

    it('should reject query exceeding max length', () => {
      const longQuery = 'a'.repeat(101);
      const result = schemas.searchQuerySchema.safeParse({ query: longQuery });
      expect(result.success).toBe(false);
    });

    it('should accept query with spaces', () => {
      const result = schemas.searchQuerySchema.safeParse({ query: 'new zealand' });
      expect(result.success).toBe(true);
    });

    it('should validate real country names from data.json', () => {
      const realCountryNames = mockCountries.slice(0, 5).map((c: any) => c.name.common.toLowerCase());
      realCountryNames.forEach((name: string) => {
        const result = schemas.searchQuerySchema.safeParse({ query: name });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('regionSchema', () => {
    it('should accept Africa', () => {
      const result = schemas.regionSchema.safeParse({ region: 'Africa' });
      expect(result.success).toBe(true);
    });

    it('should accept Americas', () => {
      const result = schemas.regionSchema.safeParse({ region: 'Americas' });
      expect(result.success).toBe(true);
    });

    it('should accept Asia', () => {
      const result = schemas.regionSchema.safeParse({ region: 'Asia' });
      expect(result.success).toBe(true);
    });

    it('should accept Europe', () => {
      const result = schemas.regionSchema.safeParse({ region: 'Europe' });
      expect(result.success).toBe(true);
    });

    it('should accept Oceania', () => {
      const result = schemas.regionSchema.safeParse({ region: 'Oceania' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid region', () => {
      const result = schemas.regionSchema.safeParse({ region: 'InvalidRegion' });
      expect(result.success).toBe(false);
    });

    it('should reject empty region', () => {
      const result = schemas.regionSchema.safeParse({ region: '' });
      expect(result.success).toBe(false);
    });

    it('should validate real regions from data.json', () => {
      const realRegions = [...new Set(mockCountries.map((c: any) => c.region))];
      realRegions.forEach((region: any) => {
        const result = schemas.regionSchema.safeParse({ region: region as any });
        expect(result.success).toBe(true);
      });
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
        flags: validCountry.flags,
      };
      const result = schemas.countrySummarySchema.safeParse(summary);
      expect(result.success).toBe(true);
    });

    it('should reject country with negative population', () => {
      const validCountry = mockCountries[0];
      const invalidSummary = {
        cca3: validCountry.cca3,
        name: { common: validCountry.name.common },
        capital: validCountry.capital,
        region: validCountry.region,
        population: -100,
        flags: validCountry.flags,
      };
      const result = schemas.countrySummarySchema.safeParse(invalidSummary);
      expect(result.success).toBe(false);
    });

    it('should parse all countries from data.json as summaries', () => {
      mockCountries.forEach((country: any) => {
        const summary = {
          cca3: country.cca3,
          name: { common: country.name.common },
          capital: country.capital,
          region: country.region,
          population: country.population,
          flags: country.flags,
        };
        const result = schemas.countrySummarySchema.safeParse(summary);
        expect(result.success).toBe(true);
      });
    });
  });
});
