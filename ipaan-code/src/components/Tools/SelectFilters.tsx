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
    countries: string[]; // Array of country codes
    cities: string[]; // Array of city names
  }


// component body
function Filters (){

    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
        countries: [],
        cities: [],
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
  // Effect to log selectedOptions whenever it changes
  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  // Function to handle saving selected options
  const handleSave = () => {
    const countryLabels = selectedCountryOptions.map(option => option.label);
    const cityLabels = selectedCityOptions.map(option => option.label);
    
    setSelectedOptions({
      countries: countryLabels,
      cities: cityLabels,
    });

    // Additional logic can be added here, such as sending data to backend
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
