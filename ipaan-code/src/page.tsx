import React, { useState, useMemo, useEffect } from 'react';
import Card, { CardContent } from '@/components/Tools/Card';
import { cardData } from './data/CardData';
import ChartBar from './components/Dashboard/BarChart';
import Header from './components/Header';
import Filters from './components/Tools/SelectFilters';
import Map from './components/Dashboard/Map';
import ChartLine2 from './components/Dashboard/LineChart';
import ChartLineISP from './components/Dashboard/LineISP';
import { heatmap } from './data/heatmap';
import { Button } from './components/ui/button';

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
    };

    useEffect(() => {
        if (shouldFetch) {
            setShouldFetch(false);
        }
    }, [shouldFetch]);

    return (
        <div className="flex flex-col gap-5 w-full p-10">

            <div>
                <Header />
            </div>

            <div>
                <CardContent>
                <section className='text-center'>
                    <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-6'>User Testing</h2>
                    
                    <Button className='mx-10 bg-gray-200 text-gray-800'>
                        South Africa
                    </Button>

                    <Button className='mx-10 bg-gray-200 text-gray-800'>
                        Kenya
                    </Button>

                    <Button className='mx-10 bg-gray-200 text-gray-800'>
                        Nigeria
                    </Button>

                </section>
                </CardContent>

            </div>

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

            <div className="relative">
                {/* Position Filters on top with z-index */}
                <div className="absolute top-0 left-0 right-0 z-10">
                    <Filters onSave={handleSave} />
                </div>

                <section className="pt-16">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service in selected countries</span>
                    </h2>
                </section>

                <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 h-3/4">
                    <CardContent className="h-[450px] p-0 m-0">
                        <Map heatData={heatmap} />
                    </CardContent>

                    <section className="grid grid-cols-1  transition-all lg:grid-cols-1">
                        <CardContent className="h-3/4 p-0 m-0">
                            <ChartLine2 
                                request={memoizedRequest}
                                shouldFetch={shouldFetch}
                                keys={["upload", "download"]}
                                description='Upload and Download Performance over time'
                                chartType="download"/>
                        </CardContent>
                    </section>
                </section>
            </div>

            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service in selected cities</span>
                </h2>
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <ChartLine2 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["upload", "download"]}
                        description='Upload and Download Performance over time'
                        chartType="download"/>
                </CardContent>

                <CardContent className="h-full">
                    <ChartBar
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["download", "upload"]}
                        chartType="download"
                    />
                </CardContent>
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <ChartLine2 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time'
                        chartType="latency"/>
                </CardContent>

                <CardContent className="h-full">
                    <ChartLine2 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Content Delivery Metrics over Time'
                        chartType="latency"/>
                </CardContent>
            </section>

            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service of ISPs</span>
                </h2>
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <ChartLineISP 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["upload", "download"]} 
                        description='Upload and Download Performance over time'
                        chartType="download" />
                </CardContent>

                <CardContent className="h-full">
                    <ChartLineISP 
                        request={memoizedRequest}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time' 
                        chartType="latency" />
                </CardContent>
            </section>
        </div>
    );
};

export default Home;
