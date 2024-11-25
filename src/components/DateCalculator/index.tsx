import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format, addDays, subDays } from 'date-fns';

type Props = {
  dateDisplay: Date;
  setDateDisplay: (value: Date) => void;
};

export const DateCalculator: FC<Props> = ({ dateDisplay, setDateDisplay }) => {
  const [dateDays, setDateDays] = useState(0);

  const getMonthDates = () => {
    // Get first day of current month
    const firstDayOfMonth = new Date(
      dateDisplay.getFullYear(),
      dateDisplay.getMonth(),
      1
    );

    // Get the starting date by subtracting days until we reach the first Sunday
    const startDate = new Date(firstDayOfMonth);
    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const dates: Date[] = [];

    // Generate 42 days, creating new Date objects for each day
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }

    return dates;
  };

  const renderCalendar = () => {
    // Render weekday headers
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
      <div key={day} className='text-center font-bold text-gray-400'>
        {day}
      </div>
    ));

    // Render calendar dates
    const calendarDates = getMonthDates().map((date, index) => {
      const isCurrentMonth = date.getMonth() === dateDisplay.getMonth();
      const isSelected = date.toDateString() === dateDisplay.toDateString();

      return (
        <Button
          key={index}
          onClick={() => setDateDisplay(new Date(date))}
          className={`p-2 text-sm rounded-sm ${
            isCurrentMonth
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
          } ${isSelected ? 'border-2 border-orange-500' : ''}`}
        >
          {date.getDate()}
        </Button>
      );
    });

    return (
      <div className='grid grid-cols-7 gap-2'>
        {weekDays}
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
    <div className='space-y-4'>
      <div className='bg-gray-800 p-4 rounded-md shadow-inner'>
        <div className='text-center mb-2 font-bold text-[#33d9b2] text-xl'>
          {format(dateDisplay, 'MMMM d, yyyy')}
        </div>
        {renderCalendar()}
      </div>
      <div className='flex items-center gap-2'>
        <Input
          type='number'
          placeholder='Days'
          onChange={(e) => setDateDays(parseInt(e.target.value) || 0)}
          className='bg-gray-700 border-none rounded-sm text-gray-200 font-mono'
        />
        <Button
          onClick={() => handleDateOperation('add')}
          className='bg-orange-500 hover:bg-orange-600 rounded-sm text-white border-b-4 border-orange-700 active:border-b-0 active:mt-1 transition-all'
        >
          Add
        </Button>
        <Button
          onClick={() => handleDateOperation('subtract')}
          className='bg-orange-500 hover:bg-orange-600 rounded-sm text-white border-b-4 border-orange-700 active:border-b-0 active:mt-1 transition-all'
        >
          Subtract
        </Button>
      </div>
      <div className='text-center text-[#33d9b2] text-xl font-bold font-mono bg-gray-800 p-2 rounded-md'>
        Result: {format(dateDisplay, 'MM/dd/yyyy')}
      </div>
    </div>
  );
};
