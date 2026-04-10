export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN',
  TIMEOUT = 'TIMEOUT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export interface AppErrorProps {
  code: ErrorCode;
  message: string;
  status?: number;
  context?: string;
  originalError?: Error;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status?: number;
  readonly context?: string;
  readonly originalError?: Error;

  constructor(props: AppErrorProps) {
    super(props.message);
    this.name = 'AppError';
    this.code = props.code;
    this.status = props.status;
    this.context = props.context;
    this.originalError = props.originalError;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  static network(status: number, endpoint: string, originalError?: Error): AppError {
    return new AppError({
      code: ErrorCode.NETWORK_ERROR,
      message: status === 0 ? 'Network unavailable' : `Failed to fetch from ${endpoint}`,
      status,
      context: endpoint,
      originalError,
    });
  }

  static notFound(resource: string, identifier: string): AppError {
    return new AppError({
      code: ErrorCode.NOT_FOUND,
      message: `${resource} not found: ${identifier}`,
      status: 404,
      context: identifier,
    });
  }

  static validation(message: string, context?: string): AppError {
    return new AppError({
      code: ErrorCode.VALIDATION_ERROR,
      message,
      context,
    });
  }

  static unknown(originalError: unknown): AppError {
    const message = originalError instanceof Error ? originalError.message : 'An unknown error occurred';
    return new AppError({
      code: ErrorCode.UNKNOWN,
      message,
      status: 500,
      originalError: originalError instanceof Error ? originalError : undefined,
    });
  }

  static timeout(message = 'Request timed out'): AppError {
    return new AppError({
      code: ErrorCode.TIMEOUT,
      message,
      status: 408,
    });
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Maps any error to an AppError and provides a user-friendly message.
 */
export function handleError(error: unknown, context?: string): AppError {
  if (isAppError(error)) return error;
  
  // Handle specific fetch errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return AppError.network(0, context || 'fetch');
  }

  return AppError.unknown(error);
}

export function getFriendlyMessage(error: unknown): string {
  if (!isAppError(error)) return 'An unexpected error occurred.';

  switch (error.code) {
    case ErrorCode.NETWORK_ERROR:
      return 'Unable to connect. Please check your internet connection.';
    case ErrorCode.NOT_FOUND:
      return 'The requested information was not found.';
    case ErrorCode.TIMEOUT:
      return 'The request took too long. Please try again.';
    case ErrorCode.VALIDATION_ERROR:
      return error.message;
    default:
      return 'Something went wrong. Please try again.';
  }
}
