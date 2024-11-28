import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator as CalculatorIcon, CalendarIcon } from 'lucide-react';
import { NumbersCalculator } from '@/components/NumbersCalculator';
import { DateCalculator } from '@/components/DateCalculator';

const RetroCalculator = () => {
  return (
    <div className='w-full max-w-md mx-auto bg-gradient-to-b from-gray-700 to-gray-900 p-4 sm:p-8 rounded-lg shadow-2xl border-t-8 border-gray-600'>
      <Tabs defaultValue='numbers' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 mb-4 sm:mb-6 bg-gray-800 p-1 rounded-md min-h-fit'>
          <TabsTrigger
            value='numbers'
            className='data-[state=active]:bg-orange-500 rounded-sm !text-gray-300 transition-colors text-sm sm:text-base'
          >
            <CalculatorIcon className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
            Numbers
          </TabsTrigger>
          <TabsTrigger
            value='dates'
            className='data-[state=active]:bg-orange-500 rounded-sm !text-gray-300 transition-colors text-sm sm:text-base'
          >
            <CalendarIcon className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' />
            Dates
          </TabsTrigger>
        </TabsList>
        <TabsContent value='numbers'>
          <NumbersCalculator />
        </TabsContent>
        <TabsContent value='dates'>
          <DateCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RetroCalculator;
