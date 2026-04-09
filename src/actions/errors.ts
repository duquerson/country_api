import { AppError, ErrorCode } from '../core/domain/AppError';

export function mapAppErrorToActionError(error: unknown): { message: string; code: string } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    };
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
      code: ErrorCode.UNKNOWN,
    };
  }
  
  return {
    message: 'An unknown error occurred',
    code: ErrorCode.UNKNOWN,
  };
}

export function createActionError(message: string, code: ErrorCode = ErrorCode.UNKNOWN) {
  return new Error(`${code}: ${message}`);
}
