import { describe, it, expect } from 'vitest';
import { mapAppErrorToActionError, createActionError } from '../actions/errors';
import { AppError, ErrorCode } from '../core/domain/AppError';

describe('Actions - Error Handling', () => {
  describe('mapAppErrorToActionError', () => {
    it('should map AppError correctly', () => {
      const appError = new AppError({
        code: ErrorCode.NOT_FOUND,
        message: 'Country not found',
        status: 404,
      });

      const result = mapAppErrorToActionError(appError);

      expect(result.message).toBe('Country not found');
      expect(result.code).toBe(ErrorCode.NOT_FOUND);
    });

    it('should map regular Error correctly', () => {
      const error = new Error('Something went wrong');

      const result = mapAppErrorToActionError(error);

      expect(result.message).toBe('Something went wrong');
      expect(result.code).toBe(ErrorCode.UNKNOWN);
    });

    it('should handle unknown errors', () => {
      const result = mapAppErrorToActionError('string error');

      expect(result.message).toBe('An unknown error occurred');
      expect(result.code).toBe(ErrorCode.UNKNOWN);
    });
  });

  describe('createActionError', () => {
    it('should create error with default code', () => {
      const error = createActionError('Test error');

      expect(error.message).toBe('UNKNOWN: Test error');
    });

    it('should create error with custom code', () => {
      const error = createActionError('Not found', ErrorCode.NOT_FOUND);

      expect(error.message).toBe('NOT_FOUND: Not found');
    });
  });
});
