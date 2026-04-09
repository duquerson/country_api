import { AppError, isAppError, unknownError, networkError, ErrorCode, timeoutError } from '../domain/AppError';

const ERROR_LOG_PREFIX = '[ErrorService]';

export function createTimeoutError(): AppError {
  return timeoutError('Request timed out');
}

export function createNetworkError(cause?: unknown): AppError {
  return networkError(0, 'network', cause instanceof Error ? cause : undefined);
}

export function handleError(error: unknown, context?: string): AppError {
  if (isAppError(error)) {
    log(error, context);
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    const appError = unknownError(error);
    log(appError, context);
    return appError;
  }

  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      const appError = unknownError(error);
      log(appError, context);
      return appError;
    }
  }

  const appError = unknownError(error);
  log(appError, context);
  return appError;
}

export function isAppErrorFn(error: unknown): error is AppError {
  return isAppError(error);
}

export function isNetworkError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.isNetwork();
  }
  return false;
}

export function isNotFoundError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.isNotFound();
  }
  return false;
}

export function getUserMessage(error: unknown): string {
  if (isAppError(error)) {
    if (error.isNetwork()) {
      return 'Unable to connect. Please check your internet connection.';
    }
    if (error.isNotFound()) {
      return 'The requested country was not found.';
    }
    return error.message;
  }

  if (error instanceof Error) {
    return 'An unexpected error occurred. Please try again.';
  }

  return 'Something went wrong. Please try again.';
}


export function getErrorCode(error: unknown): ErrorCode {
  if (isAppError(error)) {
    return error.code;
  }
  return ErrorCode.UNKNOWN;
}

function log(error: AppError, context?: string) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(ERROR_LOG_PREFIX, context, error);
  }
}
