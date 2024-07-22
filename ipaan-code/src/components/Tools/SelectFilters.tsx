// Component used to save all of the filtered options and send to backend as Array

import { useEffect, useState } from "react";
import FilterList from "./Filter";
import { DatePickerWithRange } from "./DateFilter";
import { FilterOptions } from "../../data/Filterlist";
import { Button } from "../ui/button";


// Data
import {countrylist as countries} from "../../data/countrylist"
import {citylist as cities} from "../../data/citylist"

// saved filters
interface SelectedOptions {
  filters: {
    countries: string[]; // Array of country codes
    cities: string[]; // Array of city names
    isps: string[]; // Array of ISP names (if needed)
  };
  startDate: string;
  endDate: string;
}

interface FiltersProps {
  onSave: (options: SelectedOptions) => void;
}

// component body
function Filters ({onSave}: FiltersProps){

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    filters: {
      countries: [],
      cities: [],
      isps: []
    },
    startDate: "",
    endDate: ""
  });


    const [selectedCountryOptions, setSelectedCountryOptions] = useState<FilterOptions[]>([]);
    const [selectedCityOptions, setSelectedCityOptions] = useState<FilterOptions[]>([]);
  
      const handleCountryChange = (selectedOptions: FilterOptions[]) => {
        setSelectedCountryOptions(selectedOptions);
      };
      
      const handleCityChange = (selectedOptions: FilterOptions[]) => {
        setSelectedCityOptions(selectedOptions);
      };


  // Function to handle saving selected options
  const handleSave = () => {
    const countryLabels = selectedCountryOptions.map(option => option.label);
    const cityLabels = selectedCityOptions.map(option => option.label);

    const newOptions: SelectedOptions = {
      filters: {
        countries: countryLabels,
        cities: cityLabels,
        isps: [] // Update this if you add ISP filtering
      },
      startDate: '2024-01-01',
      endDate: '2024-01-04'
    };

    setSelectedOptions(newOptions);
    onSave(newOptions); // Pass the options to the parent component
  };

    return(
      <div className="flex justify-end">

            <div className="col-span-4">
              <DatePickerWithRange />
            </div>


            <div className="col-span-4 w-15"> {/* Adjust margin as needed */}
              <FilterList
                initialOptions={countries}
                onChange={handleCountryChange}
                selectionType="Country"
              />
            </div>

            <div className="col-span-4"> {/* Adjust margin as needed */}
              <FilterList
                initialOptions={cities}
                onChange={handleCityChange}
                selectionType="City"
              />
            </div>

            <div className="col-span-12 flex justify-end mt-4">
              <Button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                 Save
            </Button>
            </div>


        </div>

        
    );
}

export default Filters;
