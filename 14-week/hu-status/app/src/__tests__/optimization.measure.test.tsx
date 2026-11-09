/**
 * Week 14 – optimization measured BEFORE vs AFTER (run: npm run measure).
 *
 * Screen: "Mis materias" (protected list).
 *  1. Network: entering the screen repeatedly must not repeat the HTTP call
 *     (API client cache + sharing of identical in-flight requests).
 *  2. Rendering: typing in the search bar re-renders the page; rows must not
 *     re-render when their data did not change (React.memo + stable keys).
 */
import { act, render } from '@testing-library/react';
import { memo, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SubjectItemView } from '../components/SubjectItem';
import { createApiClient } from '../core/apiClient';
import type { Subject } from '../services/types';
import { fakeNetwork, fakeTokenStorage, jsonResponse } from './fakes';

const VISITS = 5;
const ROWS = 300;
const KEYSTROKES = 10;

const subjects: Subject[] = Array.from({ length: ROWS }, (_, i) => ({
  id: i + 1,
  name: `Materia ${i + 1}`,
  credits: (i % 3) + 1,
  teacher: `Docente ${i + 1}`,
  average: 3 + (i % 20) / 10,
}));

/** Each visit triggers the mount effect and ionViewWillEnter at the same time (2 loads). */
async function simulateVisits(cacheTtlMs: number): Promise<number> {
  const fetchFn = vi.fn<typeof fetch>(async () => jsonResponse(200, subjects));
  const api = createApiClient({
    baseUrl: 'http://api.test',
    tokenStorage: fakeTokenStorage('token'),
    network: fakeNetwork(true),
    fetchFn,
    cacheTtlMs,
  });
  for (let visit = 0; visit < VISITS; visit += 1) {
    await Promise.all([api.request('/api/subjects'), api.request('/api/subjects')]);
  }
  return fetchFn.mock.calls.length;
}

function measureRendering(memoized: boolean): { rowRenders: number; ms: number } {
  let rowRenders = 0;
  const CountedRow: React.FC<{ subject: Subject }> = (props) => {
    rowRenders += 1;
    return <SubjectItemView {...props} />;
  };
  const Row = memoized ? memo(CountedRow) : CountedRow;

  let setQuery: (value: string) => void = () => undefined;
  const Page: React.FC = () => {
    const [query, set] = useState('');
    setQuery = set;
    return (
      <div>
        <input value={query} readOnly />
        {subjects.map((subject) => (
          <Row key={subject.id} subject={subject} />
        ))}
      </div>
    );
  };

  render(<Page />);
  rowRenders = 0; // count only the re-renders caused by typing
  const start = performance.now();
  for (let i = 1; i <= KEYSTROKES; i += 1) {
    act(() => setQuery('M'.repeat(i)));
  }
  return { rowRenders, ms: performance.now() - start };
}

describe('Optimization – before vs after', () => {
  it('network: repeated visits to the list', async () => {
    const before = await simulateVisits(0); // no cache, no de-duplication
    const after = await simulateVisits(60_000); // implemented strategy
    console.table({
      'HTTP requests (5 visits)': { before, after, reduction: `${Math.round((1 - after / before) * 100)} %` },
    });
    expect(before).toBe(VISITS * 2);
    expect(after).toBe(1);
  });

  it('rendering: typing 10 characters with 300 rows', () => {
    const before = measureRendering(false);
    const after = measureRendering(true);
    console.table({
      'Row re-renders': { before: before.rowRenders, after: after.rowRenders },
      'Time (ms, jsdom)': { before: before.ms.toFixed(1), after: after.ms.toFixed(1) },
    });
    expect(before.rowRenders).toBe(ROWS * KEYSTROKES);
    expect(after.rowRenders).toBe(0);
    expect(after.ms).toBeLessThan(before.ms);
  });
});
