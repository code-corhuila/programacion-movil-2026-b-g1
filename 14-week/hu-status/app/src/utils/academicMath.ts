import type { Subject } from '../services/types';

/**
 * Credit-weighted average of the subjects (0.0–5.0), rounded to one decimal.
 * Returns null when there are no credits to weight.
 */
export function weightedAverage(subjects: readonly Pick<Subject, 'credits' | 'average'>[]): number | null {
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  if (totalCredits === 0) {
    return null;
  }
  const weighted = subjects.reduce((sum, s) => sum + s.average * s.credits, 0) / totalCredits;
  return Math.round(weighted * 10 + 1e-9) / 10;
}

/** "4,3" (Colombian decimal comma) or "—" when there is no value. */
export function formatGrade(value: number | null): string {
  return value === null ? '—' : value.toFixed(1).replace('.', ',');
}

/** Passing grade in Colombian universities. */
export const PASSING_GRADE = 3.0;

export const isPassing = (average: number): boolean => average >= PASSING_GRADE;
