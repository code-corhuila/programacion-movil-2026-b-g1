import { describe, expect, it } from 'vitest';

import { formatGrade, isPassing, weightedAverage } from './academicMath';

describe('weightedAverage (calculation)', () => {
  it('weights each average by its credits and rounds to one decimal', () => {
    // (4.3*3 + 3.8*3 + 2.9*2) / 8 = 3.7625 -> 3.8
    expect(
      weightedAverage([
        { credits: 3, average: 4.3 },
        { credits: 3, average: 3.8 },
        { credits: 2, average: 2.9 },
      ]),
    ).toBe(3.8);
  });

  it('rounds half up and returns null when there are no credits', () => {
    expect(weightedAverage([{ credits: 1, average: 3.25 }, { credits: 1, average: 3.25 }])).toBe(3.3);
    expect(weightedAverage([])).toBeNull();
  });
});

describe('formatGrade (formatting)', () => {
  it('uses one decimal with a comma and a dash for missing values', () => {
    expect(formatGrade(4)).toBe('4,0');
    expect(formatGrade(3.75)).toBe('3,8');
    expect(formatGrade(null)).toBe('—');
  });

  it('passing grade is 3.0', () => {
    expect(isPassing(3)).toBe(true);
    expect(isPassing(2.9)).toBe(false);
  });
});
