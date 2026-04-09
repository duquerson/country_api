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

  isNetwork(): boolean {
    return this.code === ErrorCode.NETWORK_ERROR;
  }

  isNotFound(): boolean {
    return this.code === ErrorCode.NOT_FOUND;
  }

  isTimeout(): boolean {
    return this.code === ErrorCode.TIMEOUT;
  }
}

export function networkError(status: number, endpoint: string, originalError?: Error): AppError {
  return new AppError({
    code: ErrorCode.NETWORK_ERROR,
    message: status === 0 
      ? 'Network unavailable' 
      : `Failed to fetch from ${endpoint}`,
    status,
    context: endpoint,
    originalError,
  });
}

export function notFoundError(resource: string, identifier: string): AppError {
  return new AppError({
    code: ErrorCode.NOT_FOUND,
    message: `${resource} not found: ${identifier}`,
    status: 404,
    context: identifier,
  });
}

export function unknownError(originalError: unknown): AppError {
  const message = originalError instanceof Error 
    ? originalError.message 
    : 'An unknown error occurred';
  
  return new AppError({
    code: ErrorCode.UNKNOWN,
    message,
    status: 500,
    originalError: originalError instanceof Error ? originalError : undefined,
  });
}

export function timeoutError(message = 'Request timed out'): AppError {
  return new AppError({
    code: ErrorCode.TIMEOUT,
    message,
    status: 408,
  });
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}