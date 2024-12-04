export const getMonthDates = (dateDisplay: Date) => {
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

export const getOccurencesInRow = (row: string, value: string) => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return row.match(new RegExp(`${escapedValue}+$`))?.[0].length || 0;
};
