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

const enterDays = (days: string) => {
  cy.getByTestId('days-input').clear().type(days);
};

const clickAddButton = () => {
  cy.getByTestId('add-button').click();
};

const clickSubtractButton = () => {
  cy.getByTestId('subtract-button').click();
};

describe('Dates Calculator', () => {
  beforeEach(() => {
    cy.clock(MOCK_DATE);
    cy.getByTestId('dates-tab').click();
  });

  it('should show the current date', () => {
    cy.contains('March 1, 2024');
  });

  it('should show week days', () => {
    cy.getByTestId('week-day').should('have.length', 7);
  });

  it('should display 42 days in the calendar', () => {
    cy.getByTestId('calendar').find('button').should('have.length', 42);
  });

  it('days input should have a placeholder', () => {
    cy.getByTestId('days-input').should('have.attr', 'placeholder', 'Days');
  });

  it('should calculate the dates', () => {
    enterDays('10');
    clickAddButton();
    cy.contains('March 11, 2024');
    enterDays('-11');
    clickAddButton();
    cy.contains('February 29, 2024');
    enterDays('3');
    clickSubtractButton();
    cy.contains('February 26, 2024');
  });

  it('should be able to select dates from previous and next months', () => {
    cy.getByTestId('date-February 29').should('be.visible').click();
    cy.contains('February 29, 2024');
    cy.getByTestId('date-March 9').should('be.visible').click();
    cy.getByTestId('date-April 6').should('be.visible').click();
    cy.contains('April 6, 2024');
  });
});

