import { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  numberDisplay: string;
  setNumberDisplay: (value: string) => void;
};

export const NumbersCalculator: FC<Props> = ({
  numberDisplay,
  setNumberDisplay,
}) => {
  const buttonValues = [
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
  const handleNumberClick = (value: string) => {
    setNumberDisplay(numberDisplay === '0' ? value : numberDisplay + value);
  };

  const handleOperationClick = (operation: string) => {
    setNumberDisplay(numberDisplay + operation);
  };

  const calculateResult = () => {
    try {
      setNumberDisplay(eval(numberDisplay).toString());
    } catch {
      setNumberDisplay('Error');
    }
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
        />
      </div>
      <div className='grid grid-cols-4 gap-2'>
        {buttonValues.map((btn) => (
          <Button
            key={btn}
            onClick={() =>
              btn === '=' ? calculateResult() : handleNumberClick(btn)
            }
            className={`text-xl font-bold rounded-sm ${
              btn === '='
                ? 'col-span-2 bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            } border-b-4 border-gray-900 active:border-b-0 active:mt-1 transition-all`}
          >
            {btn}
          </Button>
        ))}
      </div>
      <Button
        onClick={clearDisplay}
        className='w-full bg-red-500 hover:bg-red-600 text-xl font-bold rounded-sm border-b-4 border-red-700 active:border-b-0 active:mt-1 transition-all'
      >
        Clear
      </Button>
    </div>
  );
};
