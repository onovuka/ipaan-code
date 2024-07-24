import React, { useState, useMemo, useEffect } from 'react';
import Card, { CardContent } from '@/components/Tools/Card';
import { cardData } from './data/CardData';
import ChartBar from './components/Dashboard/BarChart';
import ChartPie from './components/Dashboard/PieChart';
import { ChartLine } from './components/Dashboard/LineChart';
import Header from './components/Header';
import Filters from './components/Tools/SelectFilters';
import Map from './components/Dashboard/Map';
import ChartLine2 from './components/Dashboard/Line';
import { summaryLine } from './data/summaryLine';
import { chartConfigLine as chartConfig } from './data/linechartconfig';

interface Requests {
    filters: {
        countries: string[];
        cities: string[];
        isps: string[];
    };
    startDate: string;
    endDate: string;
}

const Home: React.FC = () => {
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const [selectedOptions, setSelectedOptions] = useState<Requests>({
        filters: {
            countries: [],
            cities: [],
            isps: [],
        },
        startDate: '',
        endDate: '',
    });

    const memoizedRequest = useMemo(() => selectedOptions, [selectedOptions]);

    const handleSave = (newOptions: Requests) => {
        setSelectedOptions(newOptions);
        setShouldFetch(true);
        console.log('set changes');
        console.log(JSON.stringify(newOptions, null, 2));
    };

    useEffect(() => {
        if (shouldFetch) {
            setShouldFetch(false);
        }
    }, [shouldFetch]);

    return (
        <div className="flex flex-col gap-5 w-full p-10">

                <section>

                <ChartLine2
                    />

                </section>

            <Header />
            <Filters onSave={handleSave} />
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

            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service in selected countries</span>
                </h2>
            </section>


            {/* Top half of data contaning country summary */}
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <Map />
                </CardContent>

                <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">

                    {/* Pie chart with country test distibutions by city */}
                    <div className="col-span-1 lg:col-span-2 text-center mt-4">
                        <p>Test distribution</p>
                    </div>
                    <div className="flex justify-between gap-4">

                        <ChartPie 
                            request={memoizedRequest}
                            shouldFetch={shouldFetch}
                            chartType='Downloads'                
                        />

                    </div>
                    <div className="flex justify-between gap-4">
                        <ChartPie 
                            request={memoizedRequest}
                            shouldFetch={shouldFetch}
                            chartType='Uploads'
                        />
                    </div>
                </section>

            </section >


            {/* Row 2 */}
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">

                {/* download overtime */}
                <CardContent className="h-full">
                    <ChartLine 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        chartType="download"
                        description='Upload and Download Performance over time'
                        keys={["upload", "download"]}
                         />
                </CardContent>

                {/* latency over time */}
                <CardContent className="h-full">
                    <ChartLine 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time' 
                        chartType="latency" />
                </CardContent>

            </section>


            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service in selected cities</span>
                </h2>
            </section>

            {/* Rows containing city data information */}
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">

                {/* cities download overtime */}
                <CardContent className="h-full">
                    <ChartLine 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["upload", "download"]} 
                        description='Upload and Download Performance over time'
                        chartType="download" />
                </CardContent>

                {/* Intercity ISP performance*/}
                <CardContent className="h-full">
                    <ChartBar
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        chartType={"city"}
                    />
                </CardContent>

            </section>


            {/* Rows containing city data information */}
            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">

                {/* latency over time */}
                <CardContent className="h-full">
                    <ChartLine 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time'
                        chartType="latency" />
                </CardContent>


                {/* intercity latency per isp*/}
                <CardContent className="h-full">
                    <ChartBar
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        chartType={"city"}
                    />
                </CardContent>

            </section>



            {/* ISP related information */}
            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service in ISPs</span>
                </h2>
            </section>


            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <Map />
                </CardContent>


                {/* isp download overtime */}
                <CardContent className="h-full">
                    <ChartLine 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["upload", "download"]} 
                        description='Upload and Download Performance over time'
                        chartType="download" />
                </CardContent>


            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">

                {/* Latency and Loss rate */}
                <CardContent className="h-full">
                    <ChartLine 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time' 
                        chartType="latency" />
                </CardContent>


                {/* ISP on x axis */}
                <CardContent className="h-full">
                    <ChartBar
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        chartType={"city"}
                    />
                </CardContent>
            </section>


        </div>
    );
};

export default Home;
