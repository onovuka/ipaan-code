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

// component body
function Filters({ onSave }: FiltersProps) {
  const [countryCode, setCountryCode] = useState<string>("");

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
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 1),
  });

  const handleCountryChange = (selectedOptions: FilterOptions[]) => {
    setSelectedCountryOptions(selectedOptions);
    setCountryCode(selectedOptions[0]?.value || "");
    changeCityOptions(selectedOptions[0]?.value || "");
    changeIspOptions(selectedOptions[0]?.value || "");
  };

  const handleCityChange = (selectedOptions: FilterOptions[]) => {
    setSelectedCityOptions(selectedOptions);
  };

  const handleIspChange = (selectedOptions: FilterOptions[]) => {
    setSelectedIspOptions(selectedOptions);
  };

  function changeCityOptions(countryCode: string) {
    if (countryCode in filterData) {
      const cities = filterData[countryCode].cities;
      const cityOptions: FilterOptions[] = cities.map(city => ({
        label: city,
        value: city
      }));
      setCities(cityOptions);
    } else {
      setCities([]);
    }
  }

  function changeIspOptions(countryCode: string) {
    if (countryCode in filterData) {
      const isps = filterData[countryCode].isps;
      const ispOptions: FilterOptions[] = isps.map(isp => ({
        label: isp,
        value: isp
      }));
      setISP(ispOptions);
    } else {
      setISP([]);
    }
  }

  useEffect(() => {
    if (countryCode) {
      changeCityOptions(countryCode);
      changeIspOptions(countryCode);
    }
  }, [countryCode]);

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
    const countryLabels = selectedCountryOptions.map(option => option.value);
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
          initialOptions={countries}
          onChange={handleCountryChange}
          selectionType="Country"
          max={1}
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
