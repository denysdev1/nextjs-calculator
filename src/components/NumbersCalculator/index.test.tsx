import { calculateExpressionResult } from '@/helpers';
import { numbersCalculatorButtons } from '@/utils/consts';
import { screen, render } from '@testing-library/react';
import { NumbersCalculator } from './index';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

const TEST_CASES = {
  basicOperations: {
    addition: { expression: '2+2', expected: 2 + 2 },
    subtraction: { expression: '5-3', expected: 5 - 3 },
    multiplication: { expression: '3*4', expected: 3 * 4 },
    division: { expression: '8/2', expected: 8 / 2 },
  },
  invalidExpressions: {
    incompleteOperations: ['1+1+', '1+1/', '1+1*', '1+1-'],
    invalidCharacters: ['Test text'],
    singleOperators: ['/', '*', '-', '+', '.'],
    invalidDecimals: ['1..2', '1.2.3'],
    invalidParentheses: ['()'],
    multipleOperators: ['1++1', '2++5'],
  },
  specialCases: {
    divisionByZero: { expression: '5/0', expected: 'Error' },
    negativeNumbers: { expression: '-5+3', expected: -5 + 3 },
    decimalNumbers: { expression: '5/2', expected: 5 / 2 },
  },
  uiTests: {
    simpleExpression: {
      buttons: ['1', '+', '1'],
      expected: '2',
    },
  },
};

const renderComponent = () => render(<NumbersCalculator />);
const getDisplay = () => screen.getByRole('textbox');
const getClearButton = () => screen.getByRole('button', { name: /clear/i });
const clickButton = async (button: string) => {
  const buttonElement = screen.getByRole('button', { name: button });
  await user.click(buttonElement);
};
const clickButtons = async (buttons: string[]) => {
  for (const button of buttons) {
    await clickButton(button);
  }
};
const expectDisplayValue = (expectedValue: string) => {
  expect(getDisplay()).toHaveValue(expectedValue);
};

describe('NumbersCalculator', () => {
  describe('Expression Calculation', () => {
    describe('Basic Operations', () => {
      Object.entries(TEST_CASES.basicOperations).forEach(
        ([operation, { expression, expected }]) => {
          it(`should perform ${operation} correctly`, () => {
            expect(calculateExpressionResult(expression)).toBe(expected);
          });
        }
      );
    });

    describe('Invalid Expressions', () => {
      const allInvalidExpressions = Object.values(
        TEST_CASES.invalidExpressions
      ).flat();

      it('should return "Error" for all invalid expressions', () => {
        allInvalidExpressions.forEach((expression) => {
          expect(calculateExpressionResult(expression)).toBe('Error');
        });
      });
    });

    describe('Special Cases', () => {
      Object.entries(TEST_CASES.specialCases).forEach(
        ([caseName, { expression, expected }]) => {
          it(`should handle ${caseName}`, () => {
            expect(calculateExpressionResult(expression)).toBe(expected);
          });
        }
      );
    });
  });

  describe('UI Interactions', () => {
    describe('Initial State', () => {
      it('should display all calculator buttons', () => {
        renderComponent();
        numbersCalculatorButtons.forEach((button) => {
          expect(
            screen.getByRole('button', { name: button })
          ).toBeInTheDocument();
        });
      });

      it('should show the clear button', () => {
        renderComponent();
        expect(getClearButton()).toBeInTheDocument();
      });

      it('should have an initial value of 0', () => {
        renderComponent();
        expectDisplayValue('0');
      });
    });

    describe('Button Interactions', () => {
      beforeEach(() => {
        renderComponent();
      });

      it('should replace initial zero with pressed button value', async () => {
        await clickButton('1');
        expectDisplayValue('1');
      });

      it('should append pressed button to non-zero value', async () => {
        await clickButtons(['1', '2']);
        expectDisplayValue('12');
      });

      it('should clear display when clear button is pressed', async () => {
        await clickButton('5');
        await user.click(getClearButton());
        expectDisplayValue('0');
      });
    });

    describe('Expression Evaluation', () => {
      beforeEach(() => {
        renderComponent();
      });

      it('should calculate and display result when equals is pressed', async () => {
        const { buttons, expected } = TEST_CASES.uiTests.simpleExpression;

        await clickButtons(buttons);
        await clickButton('=');
        expectDisplayValue(expected);
      });

      it('should reset to 0 after showing error', async () => {
        await clickButtons(['.', '=', '=']);
        expectDisplayValue('0');
      });

      it('should show error for invalid expressions', async () => {
        await clickButtons(['+', '*', '/', '-', '+', '.', '=']);
        expectDisplayValue('Error');
      });
    });
  });
});
