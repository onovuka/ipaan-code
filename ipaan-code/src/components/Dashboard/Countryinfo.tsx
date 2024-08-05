import { CardContent } from "../Tools/Card";
import { useState, useEffect } from "react";
import Map from "./Map";
import ChartLine2 from "./LineChart";
import FilterList from "../Tools/Filter";
import { DatePickerWithRange } from "../Tools/DateFilter";
import { FilterOptions } from "../../data/Filterlist";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { countrylist as countries } from "../../data/countrylist";

// saved filters
interface SelectedOptions {
    filters: {
        countries: string[];
        cities: string[];
        isps: string[];
    };
    startDate: string;
    endDate: string;
}

interface FiltersProps {
    onSave: (options: SelectedOptions) => void;
}

function CountryInfo({ onSave }: FiltersProps) {
    const [countryCode, setCountryCode] = useState<string>("");
    const [selectedCountryOptions, setSelectedCountryOptions] = useState<FilterOptions[]>([]);
    const [isSaveEnabled, setIsSaveEnabled] = useState<boolean>(false);

    // these are the SAVED filters btw
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
        filters: {
            countries: [],
            cities: [],
            isps: []
        },
        startDate: "",
        endDate: ""
    });

    // State for date range
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2024, 0, 1),
        to: new Date(2024, 0, 1),
    });

    // This will set the country code -> For now it is one at a time
    // when country is set
    const handleCountryChange = (selectedOptions: FilterOptions[]) => {
        setSelectedCountryOptions(selectedOptions);
        setCountryCode(selectedOptions[0]?.value || "");
    };

    // Function to handle saving selected options
    const handleSave = () => {
        const countryLabels = selectedCountryOptions.map(option => option.value);
        const cityLabels: never[] = [];
        const ispLabels: never[] = [];

        const newOptions: SelectedOptions = {
            filters: {
                countries: countryLabels,
                cities: cityLabels,
                isps: ispLabels
            },
            startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
            endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : ""
        };

        setSelectedOptions(newOptions);
        onSave(newOptions);
        
    };

    // Effect to update isSaveEnabled based on country and date selection
    useEffect(() => {
        const hasSelectedCountry = selectedCountryOptions.length > 0;
        const hasSelectedDateRange = dateRange?.from !== undefined && dateRange?.to !== undefined;

        setIsSaveEnabled(hasSelectedCountry && hasSelectedDateRange);
    }, [selectedCountryOptions, dateRange]);

    return (
        <div>
            <CardContent>
                <section>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Quality of Service in selected countries
                        </span>
                    </h2>

                    {/* Add date and country */}
                    <div className="flex-grow max-w-[200px]">
                        <FilterList
                            initialOptions={countries}
                            onChange={handleCountryChange}
                            selectionType="Country"
                            max={1}
                        />
                    </div>

                    <div className="flex-grow max-w-[200px]"> {/* Adjust max-w as needed */}
                        <DatePickerWithRange
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                        />
                    </div>

                    <div className="flex items-center">
                        <Button
                            onClick={handleSave}
                            className={`w-[100px] flex items-center justify-center font-normal ${isSaveEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                            disabled={!isSaveEnabled}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </section>
            </CardContent>
        </div>
    );
}

export default CountryInfo;
