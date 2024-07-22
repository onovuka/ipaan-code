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
import ChartLine2 from './components/Dashboard/Line'
import { summaryLine } from "./data/summaryLine";
import { chartConfigLine as chartConfig } from "./data/linechartconfig";

interface requests{
    filters: {
        countries: string[]; // Array of country codes
        cities: string[]; // Array of city names
        isps: string[]; // Array of ISP names (if needed)
      };
      startDate: string;
      endDate: string;
}

const keys = ["download", "upload"] as Array<keyof typeof chartConfig>;


function Home(){

    // boolean to trigger fetching from API
    const [request, sendRequest] = useState<boolean>(false);

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

        console.log("set changes")
        sendRequest(true);
        console.log(JSON.stringify(selectedOptions, null, 2));
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

            <ChartLine
            data={summaryLine}
            chartType="download"
            keys={keys}
            />

        </CardContent >




          
        </section>

        <section>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Regional Quality of Service</span></h1>
        </section>

        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent className="h-full">

            <ChartLine2/>

        </CardContent >

        <CardContent className="h-full">
            <ChartBar 
            request={selectedOptions}
            fetch={request}
            barID={1}
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
                request={selectedOptions}
                fetch={request}
                barID={2}
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


        </div>

    );
}
export default Home;