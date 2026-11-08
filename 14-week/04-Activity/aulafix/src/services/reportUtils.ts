
import type { Report } from './api';

export function isValidReport(report: Report): boolean {
  return (
    Number.isInteger(report.id) &&
    report.id > 0 &&
    report.equipo.trim().length > 0 &&
    report.descripcion.trim().length > 0 &&
    report.estado.trim().length > 0
  );
}
