import { afterEach, expect, it } from 'vitest';
import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SessionList from './SessionList';

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
});

it('permite recuperar la lista después de un error', async () => {
  window.history.replaceState({}, '', '/sesiones?estado=error');

  render(
    <MemoryRouter>
      <SessionList
        sessions={[
          {
            id: '101',
            course: 'Programación Móvil',
            date: '19/10/2026',
            time: '18:30',
          },
        ]}
      />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole('status', { name: 'Cargando sesiones' }),
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('alert', {}, { timeout: 4000 }),
  ).toHaveTextContent('No pudimos cargar las sesiones');

  fireEvent.click(screen.getByText('Reintentar'));

  expect(
    screen.getByRole('status', { name: 'Cargando sesiones' }),
  ).toBeInTheDocument();

  expect(
    await screen.findByText('Programación Móvil', {}, { timeout: 4000 }),
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  expect(screen.getByText('Ver QR de la sesión 101')).toBeInTheDocument();
}, 10000);
