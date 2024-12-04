import { MOCK_DATE } from '@/utils/consts';

const clickCalculatorButton = (button: string) => {
  if (button.length > 1) {
    throw new Error('Button length should be 1');
  }

  cy.getByTestId(`calculator-button_${button}`).click();
};

const displayShouldHaveValue = (value: string) => {
  cy.get('@numberDisplay').should('have.value', value);
};

beforeEach(() => {
  cy.visit('/');
});

describe('Numbers Calculator', () => {
  beforeEach(() => {
    cy.getByTestId('number-display').as('numberDisplay');
  });

  it('should show the numbers calculator by default', () => {
    cy.get('@numberDisplay').should('have.value', '0');
  });

  it('should calculate the numbers', () => {
    const combinations = [
      { expression: '1+2=', result: '3' },
      { expression: '5*2=', result: '70' },
      { expression: '/3=', result: '23.333333333333332' },
      { expression: '-0.333333333333332=', result: '23' },
    ];

    for (const combination of combinations) {
      for (const digit of combination.expression) {
        clickCalculatorButton(digit);
      }

      clickCalculatorButton('=');
      displayShouldHaveValue(combination.result);
    }
  });

  it('should append digits to previous result', () => {
    // Calculate 1 + 2 = 3
    clickCalculatorButton('1');
    clickCalculatorButton('+');
    clickCalculatorButton('2');
    clickCalculatorButton('=');
    displayShouldHaveValue('3');

    // Press 5 to get 35
    clickCalculatorButton('5');
    displayShouldHaveValue('35');
  });

  it('should not append mathematical symbols more times than allowed', () => {
    const combinations = [
      { expression: '1++', result: '1+' },
      { expression: '2--3', result: '1+2-3' },
      { expression: '//4', result: '1+2-3/4' },
      { expression: '**5', result: '1+2-3/4**5' },
      { expression: '2***4', result: '1+2-3/4**52**4' },
    ];

    for (const combination of combinations) {
      for (const digit of combination.expression) {
        clickCalculatorButton(digit);
      }

      displayShouldHaveValue(combination.result);
    }
  });

  it('should show "Error" on display for invalid expressions', () => {
    const invalidExpressions = ['1+-*/.', '/*4', '+*-5', '2*.+', '0.+', '/0'];

    for (const expression of invalidExpressions) {
      for (const digit of expression) {
        clickCalculatorButton(digit);
      }

      clickCalculatorButton('=');
      displayShouldHaveValue('Error');
      cy.getByTestId('clear-button').click();
    }
  });

  it('should clear the display', () => {
    clickCalculatorButton('1');
    cy.getByTestId('clear-button').click();
    displayShouldHaveValue('0');
  });
});

describe('Dates Calculator', () => {
  beforeEach(() => {
    cy.clock(MOCK_DATE);
  });

  it('should show the dates calculator', () => {
    cy.getByTestId('dates-tab').click();
    cy.contains('March 1, 2024');
  });
});

