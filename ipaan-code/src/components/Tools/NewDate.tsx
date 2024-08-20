import React from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'react-day-picker';

interface NewDateProps {
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function NewDate({ dateRange, setDateRange }: NewDateProps) {
  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      format="yyyy-MM-dd"
      placeholder="Select a date range"
    />
  );
}
