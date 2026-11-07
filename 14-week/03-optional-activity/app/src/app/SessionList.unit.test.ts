
import { describe, expect, it } from 'vitest';
import {
  filterSessions,
  formatSessionDate,
  type Session,
} from './SessionList';

const sessions: Session[] = [
  {
    id: '1',
    course: 'Programación Móvil',
    date: '2026-11-07',
    time: '08:00',
  },
  {
    id: '2',
    course: 'Fullstack',
    date: '2026-11-07',
    time: '10:00',
  },
];

describe('Week 14 - Session utilities', () => {
  it('formats the session date and time correctly', () => {
    expect(formatSessionDate(sessions[0]))
      .toBe('2026-11-07 · 08:00');
  });

  it('returns an empty list in empty-state mode', () => {
    expect(filterSessions(sessions, 'vacio')).toEqual([]);
    expect(filterSessions(sessions, null)).toEqual(sessions);
  });
});
