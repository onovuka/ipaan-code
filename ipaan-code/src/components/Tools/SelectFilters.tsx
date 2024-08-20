import { useEffect, useState } from "react";
import FilterList from "./Filter";
import { DatePickerWithRange } from "./DateFilter";
import { FilterOptions } from "../../data/Filterlist";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";


// Data
import { countrylist as countries } from "../../data/countrylist";
import filterData from "@/data/FilterData";
import { countrylistValue, countryNameToCode } from "../../data/countryValue";

// Saved filters
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

const getCountryCode = (countryName: string): string | undefined => {
  const country = countries.find(c => c.label === countryName);
  return country?.value;
};

// Component body
function Filters({ onSave }: FiltersProps) {
  const today = new Date();

  const [cityOptions, setCities] = useState<FilterOptions[]>([]);
  const [ispOptions, setISP] = useState<FilterOptions[]>([]);

  const [selectedCountryOptions, setSelectedCountryOptions] = useState<FilterOptions[]>([]);
  const [selectedCityOptions, setSelectedCityOptions] = useState<FilterOptions[]>([]);
  const [selectedIspOptions, setSelectedIspOptions] = useState<FilterOptions[]>([]);

  const [isSaveEnabled, setIsSaveEnabled] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    filters: {
      countries: [],
      cities: [],
      isps: []
    },
    startDate: "",
    endDate: ""
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: today,
    to: today,
  });

  const handleCountryChange = (selectedOptions: FilterOptions[]) => {
    // Get country names from selected options
    const selectedCountryNames = selectedOptions.map(option => option.value);

    // Convert country names to country codes
    const selectedCountryCodes = selectedCountryNames.map(name => getCountryCode(name) || name);

    // Convert country codes to FilterOptions
    const updatedCountryOptions = selectedCountryCodes.map(code => ({
      label: code, // Assuming the code itself can be used as a label
      value: code
    }));

    // Set country codes in state
    setSelectedCountryOptions(updatedCountryOptions);

    // Update city and ISP options based on country codes
    changeCityOptions(selectedCountryCodes);
    changeIspOptions(selectedCountryCodes);
  };

  const handleCityChange = (selectedOptions: FilterOptions[]) => {
    setSelectedCityOptions(selectedOptions);
  };

  const handleIspChange = (selectedOptions: FilterOptions[]) => {
    setSelectedIspOptions(selectedOptions);
  };

  function changeCityOptions(countryCodes: string[]) {
    let allCities: Set<string> = new Set();

    countryCodes.forEach(code => {
      if (code in filterData) {
        const cities = filterData[code].cities;
        cities.forEach(city => allCities.add(city));
      }
    });

    const cityOptions: FilterOptions[] = Array.from(allCities).map(city => ({
      label: city,
      value: city
    }));

    setCities(cityOptions);
  }

  function changeIspOptions(countryCodes: string[]) {
    let allISPs: Set<string> = new Set();

    countryCodes.forEach(code => {
      if (code in filterData) {
        const isps = filterData[code].isps;
        isps.forEach(isp => allISPs.add(isp));
      }
    });

    const ispOptions: FilterOptions[] = Array.from(allISPs).map(isp => ({
      label: isp,
      value: isp
    }));

    setISP(ispOptions);
  }

  useEffect(() => {
    const isAnyFilterSelected =
      selectedCountryOptions.length > 0 ||
      selectedCityOptions.length > 0 ||
      selectedIspOptions.length > 0;

    const isDateSelected =
      dateRange?.from !== undefined && dateRange?.to !== undefined;

    setIsSaveEnabled(isAnyFilterSelected && isDateSelected);
  }, [selectedCountryOptions, selectedCityOptions, selectedIspOptions, dateRange]);

  const handleSave = () => {
    const countryLabels = selectedCountryOptions.map(option => countryNameToCode[option.value] || option.value);
    const cityLabels = selectedCityOptions.map(option => option.label);
    const ispLabels = selectedIspOptions.map(option => option.label);

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

  return (
    <div className="flex flex-wrap justify-between gap-4 mt-5"> {/* Adjust gap as needed */}
      <div className="flex-grow max-w-[200px]">
        <DatePickerWithRange
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>

      <div className="flex-grow max-w-[200px]">
        <FilterList
          initialOptions={countrylistValue}
          onChange={handleCountryChange}
          selectionType="Country"
          max={6} // Allows multiple country selections
        />
      </div>

      <div className="flex-grow max-w-[200px]">
        <FilterList
          initialOptions={cityOptions}
          onChange={handleCityChange}
          selectionType="City"
          max={6}
        />
      </div>

      <div className="flex-grow max-w-[200px]">
        <FilterList
          initialOptions={ispOptions}
          onChange={handleIspChange}
          selectionType="ISP"
          max={6}
        />
      </div>

      <div className="flex-shrink-0 min-w-[120px] mt-4">
        <Button
          onClick={handleSave}
          className={`w-[100px] flex items-center justify-center font-normal ${isSaveEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
          disabled={!isSaveEnabled}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default Filters;
