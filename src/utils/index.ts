export const getMonthDates = (dateDisplay: Date) => {
  // Get first day of current month
  const firstDayOfMonth = new Date(
    dateDisplay.getFullYear(),
    dateDisplay.getMonth(),
    1
  );

  // Calculate the last Sunday of the previous month
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(0); // Go to the last day of previous month

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
