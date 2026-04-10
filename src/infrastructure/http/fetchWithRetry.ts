import { AppError } from '../../core/domain/errors';
import { HTTP_TIMEOUTS } from '../config/api';

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

const DEFAULT_TIMEOUT = HTTP_TIMEOUTS.STANDARD;
const DEFAULT_RETRIES = HTTP_TIMEOUTS.RETRIES;
const DEFAULT_RETRY_DELAY = HTTP_TIMEOUTS.RETRY_DELAY;

export async function fetchWithRetry(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    ...init
  } = options;

  let lastError: Error | AppError | unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;

      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
      }
    }
  }

  if (lastError instanceof Error && lastError.name === 'AbortError') {
    throw AppError.timeout();
  }

  throw AppError.network(0, url, lastError instanceof Error ? lastError : undefined);
}

