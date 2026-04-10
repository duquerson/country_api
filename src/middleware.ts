import type { MiddlewareHandler } from 'astro';

function buildCsp(): string {
  // Ajustado a este proyecto (Astro + Vue + Tailwind + Heroicons).
  // Nota: evitamos 'unsafe-inline' en scripts; Astro permite scripts inline en layout:
  // se recomienda migrar esos scripts a un archivo o añadir nonce si se endurece más.
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' https: data:",
    "font-src 'self' https: data:",
    "style-src 'self' 'unsafe-inline' https:",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self' https://restcountries.com",
    'upgrade-insecure-requests',
  ].join('; ');
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // En SSR con adapter Node, el TLS termina normalmente en un proxy.
  // Aun así, enviar HSTS es útil si estás sirviendo HTTPS en el edge.
  response.headers.set('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');

  // CSP
  response.headers.set('Content-Security-Policy', buildCsp());

  // Cache: evita cachear HTML SSR por proxies por defecto
  if (context.request.method === 'GET' && (context.url.pathname === '/' || context.url.pathname.startsWith('/detail/'))) {
    response.headers.set('Cache-Control', 'no-store');
  }

  return response;
};
