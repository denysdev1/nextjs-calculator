'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator as CalculatorIcon, CalendarIcon } from 'lucide-react';
import { NumbersCalculator } from '@/components/Calculator';
import { DateCalculator } from '@/components/DateCalculator';

const RetroCalculator = () => {
  const [numberDisplay, setNumberDisplay] = useState('0');
  const [dateDisplay, setDateDisplay] = useState(new Date());

  return (
    <div className='w-full max-w-md mx-auto bg-gradient-to-b from-gray-700 to-gray-900 p-8 rounded-lg shadow-2xl border-t-8 border-gray-600'>
      <Tabs defaultValue='numbers' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 mb-6 bg-gray-800 p-1 rounded-md'>
          <TabsTrigger
            value='numbers'
            className='data-[state=active]:bg-orange-500 rounded-sm !text-gray-300 transition-colors'
          >
            <CalculatorIcon className='w-4 h-4 mr-2' />
            Numbers
          </TabsTrigger>
          <TabsTrigger
            value='dates'
            className='data-[state=active]:bg-orange-500 rounded-sm !text-gray-300 transition-colors'
          >
            <CalendarIcon className='w-4 h-4 mr-2' />
            Dates
          </TabsTrigger>
        </TabsList>
        <TabsContent value='numbers'>
          <NumbersCalculator
            numberDisplay={numberDisplay}
            setNumberDisplay={setNumberDisplay}
          />
        </TabsContent>
        <TabsContent value='dates'>
          <DateCalculator
            dateDisplay={dateDisplay}
            setDateDisplay={setDateDisplay}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetroCalculator;
