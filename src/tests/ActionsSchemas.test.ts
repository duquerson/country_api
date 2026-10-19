import { describe, it, expect } from 'vitest';
import * as schemas from '../core/domain/schemas';
import { getMockCountries } from './fixtures/mockData';

const mockCountries = getMockCountries();

describe('Domain - Validation Schemas (v5)', () => {
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
    it('should parse valid country summary (v5 structure)', () => {
      const validCountry = mockCountries[0];
      const summary = {
        codes: { alpha_3: validCountry.codes.alpha_3 },
        names: { common: validCountry.names.common },
        capitals: validCountry.capitals,
        region: validCountry.region,
        population: validCountry.population,
        flag: { url_svg: validCountry.flag.url_svg, emoji: validCountry.flag.emoji },
      };
      const result = schemas.countrySummarySchema.safeParse(summary);
      expect(result.success).toBe(true);
    });
  });

  describe('apiSummaryResponseSchema', () => {
    it('should parse v5 response wrapper { data: [...] }', () => {
      const validCountry = mockCountries[0];
      const summary = {
        codes: { alpha_3: validCountry.codes.alpha_3 },
        names: { common: validCountry.names.common },
        capitals: validCountry.capitals,
        region: validCountry.region,
        population: validCountry.population,
        flag: { url_svg: validCountry.flag.url_svg, emoji: validCountry.flag.emoji },
      };
      const response = { data: [summary] };
      const result = schemas.apiSummaryResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
      expect(result.data?.data).toHaveLength(1);
    });
  });

  describe('countrySchema', () => {
    it('should parse full country detail (v5 structure)', () => {
      const result = schemas.countrySchema.safeParse(mockCountries[0]);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.names.common).toBe('Colombia');
        expect(result.data.codes.alpha_3).toBe('COL');
        expect(result.data.flag.url_svg).toContain('co.svg');
        expect(result.data.currencies?.[0].name).toBe('Colombian peso');
        expect(result.data.languages?.[0].name).toBe('Spanish');
        expect(result.data.capitals?.[0].name).toBe('Bogotá');
      }
    });
  });
});
