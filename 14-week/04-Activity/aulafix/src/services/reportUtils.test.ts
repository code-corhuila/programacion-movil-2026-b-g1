
import { describe, expect, it } from 'vitest';
import { isValidReport } from './reportUtils';

describe('Validación de reportes de AulaFix', () => {
  it('acepta un reporte con información válida', () => {
    const report = {
      id: 1,
      equipo: 'Proyector',
      descripcion: 'No enciende',
      estado: 'Pendiente',
    };

    expect(isValidReport(report)).toBe(true);
  });

  it('rechaza un reporte sin nombre de equipo', () => {
    const report = {
      id: 2,
      equipo: '',
      descripcion: 'Pantalla dañada',
      estado: 'Pendiente',
    };

    expect(isValidReport(report)).toBe(false);
  });
});
