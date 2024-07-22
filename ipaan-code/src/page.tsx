"use client"
import { useState } from "react";
import Card, {CardContent} from "@/components/Tools/Card";
import { cardData } from "./data/CardData";
import ChartBar from "./components/Dashboard/BarChart";
import ChartPie from "./components/Dashboard/PieChart";
import { ChartLine } from "./components/Dashboard/LineChart";
import Header from './components/Header'
import Filters from "./components/Tools/SelectFilters";
import Map from "./components/Dashboard/Map";


interface requests{
    filters: {
        countries: string[]; // Array of country codes
        cities: string[]; // Array of city names
        isps: string[]; // Array of ISP names (if needed)
      };
      startDate: string;
      endDate: string;
}



function Home(){

    const [selectedOptions, setSelectedOptions] = useState<requests>({
        filters: {
          countries: [],
          cities: [],
          isps: []
        },
        startDate: '',
        endDate: ''
      });
    
      const handleSave = (newOptions: requests) => {
        setSelectedOptions(newOptions);
        // You can also send `newOptions` to the backend here
      };


    return(
        <div className="flex flex-col gap-5  w-full">

            <Header/>

            <Filters onSave={handleSave}/>

            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                    {cardData.map((d, i) => (
                    <Card
                        key={i}
                        total={d.total}
                        discription={d.discription}
                        icon={d.icon}
                        label={d.label}
                    />
                    ))}
            </section>


        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">

        <CardContent className="h-full">
            <Map />
        </CardContent>

        <CardContent className="h-full">

            <ChartLine/>

        </CardContent >




          
        </section>

        <section>
            Per City Statistics
        </section>

        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent className="h-full">

            <ChartLine/>

        </CardContent >

        <CardContent className="h-full">
            <ChartBar 
            request={selectedOptions}
            />
        </CardContent>
          
        </section>


        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent className="h-full">

            <ChartLine/>

        </CardContent >

        <CardContent className="h-full">
        <ChartPie className="flex justify-between gap-4 h-1/2"/>
        <ChartPie className="flex justify-between gap-4 h-1/2"/>
        </CardContent>
          
        </section>



        <section>
            Per City ISP statistics
        </section>

        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent className="h-full">

            <ChartLine/>

        </CardContent >

        <CardContent className="h-full">
            <ChartBar 
                request={selectedOptions}/>
        </CardContent>
          
        </section>


        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent className="h-full">

            <ChartLine/>

        </CardContent >

        <CardContent className="h-full">
        <ChartPie className="flex justify-between gap-4 h-1/2"/>
        <ChartPie className="flex justify-between gap-4 h-1/2"/>
        </CardContent>
          
        </section>


        </div>

    );
}
export default Home;