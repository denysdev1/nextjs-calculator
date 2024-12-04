'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { numbersCalculatorButtons } from '@/utils/consts';
import { calculateExpressionResult } from '@/helpers';

export const NumbersCalculator = () => {
  const [numberDisplay, setNumberDisplay] = useState('0');

  const handleNumberClick = (value: string) => {
    setNumberDisplay(numberDisplay === '0' ? value : numberDisplay + value);
  };

  // const handleOperationClick = (operation: string) => {
  //   setNumberDisplay(numberDisplay + operation);
  // };

  const handleCalculate = () => {
    if (numberDisplay.includes('Error')) {
      setNumberDisplay('0');
      return;
    }

    const result = calculateExpressionResult(numberDisplay);

    setNumberDisplay(result);
  };

  const clearDisplay = () => {
    setNumberDisplay('0');
  };

  return (
    <div className='space-y-4'>
      <div className='bg-gray-800 p-4 rounded-md shadow-inner'>
        <Input
          value={numberDisplay}
          readOnly
          className='text-right !text-3xl font-bold bg-[#2f3640] border-none rounded-sm text-[#33d9b2] font-mono shadow-inner'
          data-cy='number-display'
        />
      </div>
      <div className='grid grid-cols-4 gap-2'>
        {numbersCalculatorButtons.map((btn) => (
          <Button
            key={btn}
            onClick={() =>
              btn === '=' ? handleCalculate() : handleNumberClick(btn)
            }
            className={`text-xl font-bold rounded-sm ${
              btn === '='
                ? 'col-span-2 bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            } border-b-4 border-gray-900 active:border-b-0 active:mt-1 transition-all`}
            data-cy={`calculator-button_${btn}`}
          >
            {btn}
          </Button>
        ))}
      </div>
      <Button
        onClick={clearDisplay}
        className='w-full bg-red-500 hover:bg-red-600 text-xl font-bold rounded-sm border-b-4
          border-red-700 active:border-b-0 active:mt-1 transition-all'
        data-cy='clear-button'
      >
        Clear
      </Button>
    </div>
  );
};
