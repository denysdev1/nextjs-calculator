import { getMonthDates } from '@/utils';
import { weekdays } from '@/utils/consts';
import { describe, expect, it } from 'vitest';

describe('DateCalculator', () => {
  it('All weekdays should be included', () => {
    const expectedWeekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const actualWeekdays = weekdays;

    expect(actualWeekdays).toEqual(expectedWeekdays);
  });

  describe('getMonthDates', () => {
    it('should return 42 dates', () => {
      const dates = getMonthDates(new Date());

      const expectedLength = 42;

      expect(dates).toHaveLength(expectedLength);
    });

    it('should return correct dates for the current month', () => {
      const testDate = new Date(2024, 2, 1);
      const dates = getMonthDates(testDate);

      const expectedDates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(2024, 1, 25);
        date.setDate(date.getDate() + i);

        return date;
      });

      expect(dates).toEqual(expectedDates);
    });
  });
});
