export type Session = {
  id: string;
  courseId: number;
  course: string;
  date: string;
  time: string;
};

export type SessionInput = {
  courseId: number;
  date: string;
  startTime: string;
};

const STORAGE_KEY = 'attendance-workshop-sessions';

const initialSessions: Session[] = [
  {
    id: '101',
    courseId: 1,
    course: 'Programación Móvil',
    date: '2026-10-19',
    time: '18:30',
  },
  {
    id: '102',
    courseId: 1,
    course: 'Programación Móvil',
    date: '2026-10-26',
    time: '18:30',
  },
];

function isSession(value: unknown): value is Session {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.courseId === 'number' &&
    typeof item.course === 'string' &&
    typeof item.date === 'string' &&
    typeof item.time === 'string'
  );
}

export function getSessions(): Session[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [...initialSessions];

  try {
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.every(isSession)
      ? parsed
      : [...initialSessions];
  } catch {
    return [...initialSessions];
  }
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export async function createSession(
  input: SessionInput,
  simulateError = false,
): Promise<Session> {
  await new Promise(resolve => window.setTimeout(resolve, 1000));

  if (
    input.courseId !== 1 ||
    !isValidDate(input.date) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.startTime)
  ) {
    throw new Error('Revisa el curso, la fecha y la hora.');
  }

  if (simulateError) {
    throw new Error('No pudimos guardar la sesión. Intenta nuevamente.');
  }

  const session: Session = {
    id: crypto.randomUUID(),
    courseId: input.courseId,
    course: 'Programación Móvil',
    date: input.date,
    time: input.startTime,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...getSessions(), session]),
  );

  return session;
}