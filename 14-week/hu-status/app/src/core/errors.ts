/**
 * Typed errors produced by the API client. Screens never inspect HTTP codes;
 * they react to these classes (and show `toUserMessage(error)`).
 */
export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

/** The device reports no network: the request was NOT sent. */
export class OfflineError extends Error {
  constructor() {
    super('Device is offline');
    this.name = 'OfflineError';
  }
}

/** The device has network but the server could not be reached (down, wrong URL, timeout). */
export class NetworkError extends Error {
  constructor(message = 'Server unreachable') {
    super(message);
    this.name = 'NetworkError';
  }
}

/** Any other non-2xx response. */
export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message = `HTTP ${status}`) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

/** Spanish message for the user for any caught error. */
export function toUserMessage(error: unknown): string {
  if (error instanceof OfflineError) {
    return 'Sin conexión a internet. Revisa tu Wi‑Fi o datos móviles; reintentaremos cuando vuelva la conexión.';
  }
  if (error instanceof UnauthorizedError) {
    return 'Tu sesión expiró o no es válida. Inicia sesión de nuevo.';
  }
  if (error instanceof NetworkError) {
    return 'No pudimos conectar con el servidor. Verifica que la API esté en ejecución e inténtalo de nuevo.';
  }
  if (error instanceof HttpError) {
    return error.status >= 500
      ? 'El servidor tuvo un problema. Inténtalo de nuevo en unos minutos.'
      : `La solicitud no se pudo completar (código ${error.status}).`;
  }
  return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
}
