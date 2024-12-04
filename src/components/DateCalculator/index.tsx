'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format, addDays, subDays } from 'date-fns';
import { weekdays } from '@/utils/consts';
import { getMonthDates } from '@/utils';

export const DateCalculator = () => {
  const [dateDisplay, setDateDisplay] = useState(new Date());
  const [dateDays, setDateDays] = useState(0);

  const renderCalendar = () => {
    const weekDaysItems = weekdays.map((day) => (
      <div
        key={day}
        className='text-center font-bold text-gray-400 text-[10px] sm:text-sm'
        data-cy='week-day'
      >
        {day}
      </div>
    ));

    const calendarDates = getMonthDates(dateDisplay).map((date, index) => {
      const isCurrentMonth = date.getMonth() === dateDisplay.getMonth();
      const isSelected = date.toDateString() === dateDisplay.toDateString();

      return (
        <Button
          key={index}
          onClick={() => setDateDisplay(new Date(date))}
          className={`p-0.5 sm:p-2 text-[10px] leading-tight sm:text-sm rounded-sm min-w-[24px] sm:min-w-[32px] ${
            isCurrentMonth
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
          } ${isSelected ? 'border border-orange-500' : ''}`}
          aria-label={format(date, 'MMMM d')}
          data-cy={`date-${format(date, 'MMMM d')}`}
        >
          {date.getDate()}
        </Button>
      );
    });

    return (
      <div className='grid grid-cols-7 gap-0.5 sm:gap-2' data-cy='calendar'>
        {weekDaysItems}
        {calendarDates}
      </div>
    );
  };

  const handleDateOperation = (operation: string) => {
    const days = parseInt(dateDays.toString());
    if (isNaN(days)) return;

    const newDate =
      operation === 'add'
        ? addDays(dateDisplay, days)
        : subDays(dateDisplay, days);
    setDateDisplay(newDate);
  };

  return (
    <div className='space-y-2 sm:space-y-4'>
      <div className='bg-gray-800 p-2 sm:p-4 rounded-md shadow-inner'>
        <div className='text-center mb-1 sm:mb-2 font-bold text-[#33d9b2] text-base sm:text-xl'>
          {format(dateDisplay, 'MMMM d, yyyy')}
        </div>
        {renderCalendar()}
      </div>
      <div className='flex flex-col flex-wrap sm:flex-row items-center gap-2'>
        <Input
          type='number'
          placeholder='Days'
          onChange={(e) => setDateDays(parseInt(e.target.value) || 0)}
          className='w-full sm:w-auto bg-gray-700 border-none rounded-sm text-gray-200 font-mono flex-1'
          data-cy='days-input'
        />
        <div className='flex gap-2 w-full sm:w-auto flex-1'>
          <Button
            onClick={() => handleDateOperation('add')}
            className='flex-1 bg-orange-500 hover:bg-orange-600 rounded-sm text-white border-b-4 border-orange-700 active:border-b-0 active:mt-1 transition-all text-sm sm:text-base'
            data-cy='add-button'
          >
            Add
          </Button>
          <Button
            onClick={() => handleDateOperation('subtract')}
            className='flex-1 bg-orange-500 hover:bg-orange-600 rounded-sm text-white border-b-4 border-orange-700 active:border-b-0 active:mt-1 transition-all text-sm sm:text-base'
            data-cy='subtract-button'
          >
            Subtract
          </Button>
        </div>
      </div>
      <div className='text-center text-[#33d9b2] text-lg sm:text-xl font-bold font-mono bg-gray-800 p-2 rounded-md'>
        Result: {format(dateDisplay, 'MM/dd/yyyy')}
      </div>
    </div>
  );
};
