import { MOCK_DATE } from '@/utils/consts';

beforeEach(() => {
  cy.visit('/');
});

describe('Numbers Calculator', () => {
  it('should calculate the numbers', () => {
    cy.getByTestId('numbers-tab').click();
  });
});

describe('Dates Calculator', () => {
  beforeEach(() => {
    cy.clock(MOCK_DATE);
  });

  it('should calculate the dates', () => {
    cy.getByTestId('dates-tab').click();
    cy.contains('March 1, 2024');
  });
});

