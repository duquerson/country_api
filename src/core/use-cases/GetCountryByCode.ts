import type { CountryRepository } from '../interfaces/Repository';
import type { Country } from '../domain/types';

/**
 * Use case for retrieving a country by its ISO code
 */
export class GetCountryByCode {
  constructor(private repository: CountryRepository) {}

  /**
   * Execute the use case to get a country by its code
   * @param code - The ISO country code (cca3)
   * @returns The country data
   * @throws AppError if the country is not found or an error occurs
   */
  async execute(code: string): Promise<Country> {
    return this.repository.getCountryByCode(code);
  }
}