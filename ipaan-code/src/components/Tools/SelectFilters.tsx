import { useState, useEffect } from "react";
import FilterList from "./Filter";
import { DatePickerWithRange } from "./DateFilter";
import { FilterOptions } from "../../data/Filterlist";
import { Button } from "../ui/button";
import BasicDatePicker from '../Tools/Dates';


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

  const [formattedDateRange, setFormattedDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const handleCountryChange = (selectedOptions: FilterOptions[]) => {
    const selectedCountryNames = selectedOptions.map(option => option.value);
    const selectedCountryCodes = selectedCountryNames.map(name => getCountryCode(name) || name);
    const updatedCountryOptions = selectedCountryCodes.map(code => ({
      label: code,
      value: code
    }));

    setSelectedCountryOptions(updatedCountryOptions);
    changeCityOptions(selectedCountryCodes);
    changeIspOptions(selectedCountryCodes);
  };

  const handleCityChange = (selectedOptions: FilterOptions[]) => {
    setSelectedCityOptions(selectedOptions);
  };

  const handleIspChange = (selectedOptions: FilterOptions[]) => {
    setSelectedIspOptions(selectedOptions);
  };

  const handleDateChange = (startDate: string | null, endDate: string | null) => {
    setFormattedDateRange({
      startDate: startDate || "",
      endDate: endDate || ""
    });
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
      formattedDateRange.startDate !== "" && formattedDateRange.endDate !== "";

    setIsSaveEnabled(isAnyFilterSelected && isDateSelected);
  }, [selectedCountryOptions, selectedCityOptions, selectedIspOptions, formattedDateRange]);

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
      startDate: formattedDateRange.startDate,
      endDate: formattedDateRange.endDate
    };

    setSelectedOptions(newOptions);
    onSave(newOptions);

    console.log(newOptions)
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 mt-5">
      <div className="flex-grow max-w-[200px]">
        <BasicDatePicker 
          onDateChange={handleDateChange} 
        />
      </div>

      <div className="flex-grow max-w-[200px]">
        <FilterList
          initialOptions={countrylistValue}
          onChange={handleCountryChange}
          selectionType="Country"
          max={6}
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

      <div className="flex-shrink-0 min-w-[120px] mt-0 ">
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
