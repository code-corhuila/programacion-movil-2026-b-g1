import { describe, expect, it } from 'vitest';

import { HttpError, NetworkError, OfflineError, UnauthorizedError, toUserMessage } from './errors';

describe('toUserMessage', () => {
  it('gives a clear Spanish message for each failure', () => {
    expect(toUserMessage(new OfflineError())).toMatch(/Sin conexión/);
    expect(toUserMessage(new UnauthorizedError())).toMatch(/sesión expiró/);
    expect(toUserMessage(new NetworkError())).toMatch(/servidor/);
    expect(toUserMessage(new HttpError(503))).toMatch(/servidor tuvo un problema/);
    expect(toUserMessage(new HttpError(404))).toMatch(/404/);
    expect(toUserMessage('???')).toMatch(/inesperado/);
  });
});
