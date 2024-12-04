import { getMonthDates } from '@/utils';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DateCalculator } from './index';
import { format } from 'date-fns';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MOCK_DATE } from '@/utils/consts';

const setupComponent = () => {
  render(<DateCalculator />);

  return {
    getInput: () => screen.getByRole('spinbutton'),
    getAddButton: () => screen.getByRole('button', { name: 'Add' }),
    getSubtractButton: () => screen.getByRole('button', { name: 'Subtract' }),
    getDayButton: (dateText: string | RegExp) =>
      screen.getByRole('button', { name: dateText }),
  };
};

const expectDateDisplay = async (
  expectedDate: string,
  expectedResult: string
) => {
  const dateElement = await screen.findByText(new RegExp(expectedDate, 'i'));
  const resultElement = await screen.findByText(
    new RegExp(expectedResult, 'i')
  );

  expect(dateElement).toBeInTheDocument();
  expect(resultElement).toBeInTheDocument();
};

describe('DateCalculator', () => {
  beforeEach(() => {
    vi.setSystemTime(MOCK_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getMonthDates', () => {
    it('should return 42 dates', () => {
      const dates = getMonthDates(new Date());

      const expectedLength = 42;

      expect(dates).toHaveLength(expectedLength);
    });

    it('should return correct dates for the current month', () => {
      const dates = getMonthDates(new Date());
      const startDate = new Date(2024, 1, 25);

      const expectedDates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
      });

      expect(dates).toEqual(expectedDates);
    });
  });

  describe('Calendar UI', () => {
    it('should display all weekdays', () => {
      setupComponent();

      const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

      weekdays.forEach((weekday) => {
        const weekdayElement = screen.getByText(weekday);

        expect(weekdayElement).toBeInTheDocument();
      });
    });

    it('should select the current day by default', () => {
      const { getDayButton } = setupComponent();
      const currentDayButton = getDayButton(format(MOCK_DATE, 'MMMM d'));

      expect(currentDayButton).toHaveClass('border border-orange-500');
    });

    describe('Date Selection', () => {
      it.each([
        ['current month', 'march 5', '03/05/2024'],
        ['previous month', 'february 29', '02/29/2024'],
        ['next month', 'april 6', '04/06/2024'],
      ])(
        'should allow selecting dates from %s',
        async (_, dateText, expectedResult) => {
          const { getDayButton } = setupComponent();

          await user.click(getDayButton(new RegExp(dateText, 'i')));
          await expectDateDisplay(dateText + ', 2024', expectedResult);
        }
      );
    });
  });

  describe('Date Calculator Controls', () => {
    describe('Days Input', () => {
      it('should handle numeric input correctly', async () => {
        const { getInput } = setupComponent();
        const input = getInput();

        expect(input).toHaveAttribute('type', 'number');
        expect(input).toHaveAttribute('placeholder', 'Days');

        await user.type(input, '10');
        expect(input).toHaveValue(10);
      });

      it('should reject non-numeric input', async () => {
        const { getInput } = setupComponent();
        const input = getInput();

        await user.type(input, 'abc');
        expect(input).not.toHaveValue('abc');
      });
    });

    describe('Date Calculation', () => {
      it.each([
        ['add', '10', 'march 11, 2024', '03/11/2024'],
        ['subtract', '2', 'february 28, 2024', '02/28/2024'],
      ])(
        'should %s days correctly',
        async (operation, days, expectedDate, expectedResult) => {
          const { getInput, getAddButton, getSubtractButton } =
            setupComponent();

          await user.type(getInput(), days);
          await user.click(
            operation === 'add' ? getAddButton() : getSubtractButton()
          );

          await expectDateDisplay(expectedDate, expectedResult);
        }
      );
    });
  });
});
