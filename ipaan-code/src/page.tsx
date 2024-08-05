import React, { useState, useMemo, useEffect } from 'react';
import Card, { CardContent } from '@/components/Tools/Card';
import { cardData } from './data/CardData';
import Header from './components/Header';
import Filters from './components/Tools/SelectFilters';
import Map from './components/Dashboard/Map';
import { heatmap } from './data/heatmap';
import { heatmap2 } from './data/heatmapfull';
import { Button } from './components/ui/button';
import ChartLineCountryDemo from './components/UserTesting/LineChartCountry';
import LineChartCityDemo from './components/UserTesting/LineChartCity';
import ChartLineISPDemo from './components/UserTesting/LineISP';
import ChartBarDemo from './components/UserTesting/BarChart';

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

    const [selectedFilter, setSelectedFilter] = useState<string>("ZA"); // Default filter

    const memoizedRequest = useMemo(() => ({
        ...selectedOptions,
        filters: {
            ...selectedOptions.filters,
            countries: [selectedFilter],
        }
    }), [selectedOptions, selectedFilter]);

    const handleSave = (newOptions: Requests) => {
        setSelectedOptions(newOptions);
        setShouldFetch(true);
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
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

                        <Button className='mx-10 bg-gray-200 text-gray-800' onClick={() => handleFilterChange("ZA")}>
                            South Africa
                        </Button>

                        <Button className='mx-10 bg-gray-200 text-gray-800' onClick={() => handleFilterChange("KE")}>
                            Kenya
                        </Button>

                        <Button className='mx-10 bg-gray-200 text-gray-800' onClick={() => handleFilterChange("NG")}>
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

            <div className="relative mb-8"> {/* Added margin-bottom */}
                {/* Ensure Filters are absolutely positioned and above other content */}
                <div style={{ position: 'absolute', top: '0', left: '0', zIndex: 9999, width: '100%', backgroundColor: 'white', padding: '10px' }}>
                    <Filters onSave={handleSave} />
                </div>

                <section className="pt-24"> {/* Increased padding-top */}
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service in selected countries</span>
                    </h2>
                </section>

                <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 h-3/4">
                    <CardContent className="h-[500px] p-0 m-0 relative">
                        <Map heatData={heatmap2} />
                    </CardContent>

                    <section className="grid grid-cols-1 transition-all lg:grid-cols-1">
                        <CardContent className="h-full p-0 m-0">
                            <ChartLineCountryDemo
                                request={memoizedRequest}
                                filter={selectedFilter}
                                chartType={"download"}
                                description={""}
                                keys={["upload", "download"]}
                                section={''}                             
                            />
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
                    <LineChartCityDemo
                        request={memoizedRequest}
                        filter={selectedFilter}
                        chartType={"download"}
                        description='Upload and Download over Time'
                        keys={["upload", "download"]}
                    />
                </CardContent>

                <CardContent className="h-full">
                    <ChartBarDemo
                        request={memoizedRequest}
                        filter={selectedFilter}
                        keys={["download", "upload"]}
                        chartType="download"
                    />
                </CardContent>
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <LineChartCityDemo
                        request={memoizedRequest}
                        filter={selectedFilter}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time'
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
                    <ChartLineISPDemo 
                        request={memoizedRequest}
                        filter={selectedFilter}
                        keys={["upload", "download"]}
                        description='Upload and Download Performance over time'
                        chartType="download" 
                        section={''} />
                </CardContent>

                <CardContent className="h-full">
                    <ChartLineISPDemo
                        request={memoizedRequest}
                        filter={selectedFilter}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time' 
                        chartType="latency"
                        section={''} 
                        />
                </CardContent>
            </section>
        </div>
    );
};

export default Home;
