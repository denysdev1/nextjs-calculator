import { calculateExpressionResult } from '@/helpers';
import { numbersCalculatorButtons } from '@/utils/consts';
import { describe, expect, it } from 'vitest';

describe('NumbersCalculator', () => {
  it('should include all required buttons', () => {
    const expectedButtons = [
      '7',
      '8',
      '9',
      '/',
      '4',
      '5',
      '6',
      '*',
      '1',
      '2',
      '3',
      '-',
      '0',
      '.',
      '=',
      '+',
    ];

    const actualButtons = numbersCalculatorButtons;

    expect(actualButtons).toEqual(expectedButtons);
  });

  describe('calculateResult()', () => {
    it('should calculate the result', () => {
      const testString = '1+1';
      const expectedResult = '2';

      const result = calculateExpressionResult(testString);

      expect(result).toEqual(expectedResult);
    });

    it('should return an error if the string is invalid or contains an invalid operation', () => {
      const testString1 = '1+1+';
      const testString2 = '1+1/';
      const testString3 = '1+1*';
      const testString4 = '1+1-';
      const testString6 = 'Test text';
      const testString7 = '/';
      const testString5 = '*';
      const testString8 = '-';
      const testString9 = '+';
      const testString10 = '.';
      const testString11 = '1..2';
      const testString12 = '1.2.3';
      const testString13 = '()';
      const testString14 = '1++1';

      const expectedResult = 'Error';

      expect(calculateExpressionResult(testString1)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString2)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString3)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString4)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString6)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString7)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString5)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString8)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString9)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString10)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString11)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString12)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString13)).toEqual(expectedResult);
      expect(calculateExpressionResult(testString14)).toEqual(expectedResult);
    });

    it('should perform basic arithmetic operations correctly', () => {
      const additionExpression = '2+2';
      const subtractionExpression = '5-3';
      const multiplicationExpression = '3*4';
      const divisionExpression = '8/2';

      const additionResult = calculateExpressionResult(additionExpression);
      const subtractionResult = calculateExpressionResult(
        subtractionExpression
      );
      const multiplicationResult = calculateExpressionResult(
        multiplicationExpression
      );
      const divisionResult = calculateExpressionResult(divisionExpression);

      expect(additionResult).toBe('4');
      expect(subtractionResult).toBe('2');
      expect(multiplicationResult).toBe('12');
      expect(divisionResult).toBe('4');
    });

    it('should handle division by zero', () => {
      const expression = '5/0';
      const expectedResult = 'Error';

      const result = calculateExpressionResult(expression);

      expect(result).toBe(expectedResult);
    });

    it('should handle negative numbers', () => {
      const expression = '-5+3';
      const expectedResult = '-2';

      const result = calculateExpressionResult(expression);

      expect(result).toBe(expectedResult);
    });

    it('should handle decimal numbers', () => {
      const expression = '5/2';
      const expectedResult = '2.5';

      const result = calculateExpressionResult(expression);

      expect(result).toBe(expectedResult);
    });

    it('should handle multiple operators', () => {
      const expression = '2++5';
      const expectedResult = 'Error';

      const result = calculateExpressionResult(expression);

      expect(result).toBe(expectedResult);
    });
  });
});
