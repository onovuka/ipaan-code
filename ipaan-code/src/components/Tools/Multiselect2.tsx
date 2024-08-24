
import { useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { countrylist } from "@/data/countrylist";
import filterData from "@/data/FilterData";


interface Country {
    label: string;
    value: string;
}




export default function FilterCountry() {
    const [selectedCountries, setSelectedCountries] = useState<Country | null>(null);

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                showSelectAll={false}
                showClear={true} 
                value={selectedCountries} 
                onChange={(e: MultiSelectChangeEvent) => setSelectedCountries(e.value)} 
                options={countrylist} 
                optionLabel="label" 
                filter placeholder="Select Country" 
                maxSelectedLabels={3} 
                className="w-full md:w-20rem" 
                selectionLimit={6}

                />
        </div>
    );
}

