import { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface BasicDatePickerProps {
    onDateChange: (startDate: string | null, endDate: string | null) => void;
}

const BasicDatePicker = ({ onDateChange }: BasicDatePickerProps) => {
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });

    const handleChange = (newValue: DateValueType | null) => {
        if (newValue) {
            setValue(newValue);
            const formattedStartDate = formatDate(newValue.startDate);
            const formattedEndDate = formatDate(newValue.endDate);
            onDateChange(formattedStartDate, formattedEndDate);
        }
    };

    return (
        <Datepicker 
            value={value} 
            onChange={handleChange} 
            placeholder="Select Date Range"
        />
    );
};

export default BasicDatePicker;
