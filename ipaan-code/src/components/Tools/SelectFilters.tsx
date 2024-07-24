// Component used to save all of the filtered options and send to backend as Array

import { useEffect, useState } from "react";
import FilterList from "./Filter";
import { DatePickerWithRange } from "./DateFilter";
import { FilterOptions } from "../../data/Filterlist";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";


// Data
import {countrylist as countries} from "../../data/countrylist"
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
function Filters ({onSave}: FiltersProps){

  // changing the way we filter. -> save the value of country = country code
  const [countryCode, setCountryCode] = useState<string>("");

  // inital city options
  const [cityOptions, setCities] = useState<FilterOptions[]>([])

  // inital ISP options
  const [ispOptions, setISP] = useState<FilterOptions[]>([])


  const [selectedCountryOptions, setSelectedCountryOptions] = useState<FilterOptions[]>([]);
  const [selectedCityOptions, setSelectedCityOptions] = useState<FilterOptions[]>([]);
  const [selectedIspOptions, setSelectedIspOptions] = useState<FilterOptions[]>([]);


    // state for button enabled/disabled
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



    // when country is set
      const handleCountryChange = (selectedOptions: FilterOptions[]) => {

          setSelectedCountryOptions(selectedOptions);

          setCountryCode(selectedOptions[0].value);

          changeCityOptions(countryCode);

          changeIspOptions(countryCode);

      };
      
      const handleCityChange = (selectedOptions: FilterOptions[]) => {
        setSelectedCityOptions(selectedOptions);
      };

      const handleIspChange = (selectedOptions: FilterOptions[]) => {
        setSelectedIspOptions(selectedOptions);
      };


      // Function to change city initial options
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
          const ispOptions: FilterOptions[] = isps.map(isps => ({
            label: isps,
            value: isps
          }));
          setISP(ispOptions);
        } else {
          setISP([]);
        }
      }


        // useEffect to update city options when countryCode changes
      useEffect(() => {
        if (countryCode) {
          changeCityOptions(countryCode);
          changeIspOptions(countryCode);
        }
      }, [countryCode]);


        // useEffect to update the save button enabled/disabled state
      useEffect(() => {
        const isAnyOptionSelected =
          selectedCountryOptions.length > 0 &&
          selectedCityOptions.length > 0 &&
          selectedIspOptions.length > 0;
          setIsSaveEnabled(isAnyOptionSelected);
      }, [selectedCountryOptions, selectedCityOptions, selectedIspOptions]);



  // Function to handle saving selected options
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

    return(
      <div className="flex justify-end">

            <div className="col-span-4">
              <DatePickerWithRange
              dateRange={dateRange} 
              setDateRange={setDateRange}
               />
            </div>


            <div className="col-span-4 w-15"> {/* Adjust margin as needed */}
              <FilterList
                initialOptions={countries}
                onChange={handleCountryChange}
                selectionType="Country"
                max={1}
              />
            </div>

            <div className="col-span-4"> {/* Adjust margin as needed */}

              <FilterList
                initialOptions={cityOptions}
                onChange={handleCityChange}
                selectionType="City"
                max={6}
              />

            </div>

            
            <div className="col-span-4"> {/* Adjust margin as needed */}

              <FilterList
                initialOptions={ispOptions}
                onChange={handleIspChange}
                selectionType="ISP"
                max={6}
              />

            </div>

            <div className="col-span-12 flex justify-end mt-4">
              <Button onClick={handleSave}
                      className={`px-4 py-2 rounded ${isSaveEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
                      disabled={!isSaveEnabled}>
                 Save
            </Button>
            </div>


        </div>

        
    );
}

export default Filters;
