import React, { useState, useEffect } from 'react';
import Card, { CardContent } from '@/components/Tools/Card';
import { cardData } from './data/CardData';
import Header from './components/Tools/Header';
import Filters from './components/Tools/SelectFilters';
import ChartLineCountryDemo from './components/Charts/LineChartCountry';
import LineChartCityDemo from './components/Charts/LineChartCity';
import ChartLineISPDemo from './components/Charts/LineISP';
import ChartBarDemo from './components/Charts/BarChart';
import LineAfrica from './components/Charts/AfricaLine';
import MapComponent from './components/Charts/Map2';

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

    const [hover, setHover] = useState<boolean>(true);

    const [overview, setOverview] = useState<boolean>(true);

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

    const handleSave = (newOptions: Requests) => {
        setSelectedOptions(newOptions);
        console.log("Saved for request ", selectedOptions);
        setShouldFetch(true);
    };

    useEffect(() => {
        if (shouldFetch) {
            setShouldFetch(false);
        }
    }, [shouldFetch]);

    useEffect(() => {
        if (overview) {
            setOverview(false);
        }
    }, [shouldFetch]);


    // Function to download page as an HTML element
    const downloadHTML = () => {

        const htmlContent = document.documentElement.outerHTML;
t
        const blob = new Blob([htmlContent], { type: 'text/html' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Internet Performance Report.html'; 
        link.click();
    
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="flex flex-col gap-5 w-full p-10">
            <div>
                <Header />
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
                <div className="relative z-50">
                    <Filters onSave={handleSave} />
                </div>

                <section className="pt-6 pb-6">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Overview of internet performance</span>
                    </h2>
                </section>

                <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 h-3/4">
                    <div className="relative z-10 h-full"> 
                        <MapComponent/>
                    </div>

                    <div>
                        <CardContent className="h-full">
                            <LineAfrica
                                request={selectedOptions}
                                africa={true}
                                filter={selectedFilter}
                                chartType={"download"}
                                description={""}
                                keys={["upload", "download"]}
                                section={''}
                                shouldFetch={overview}
                            />
                        </CardContent>
                    </div>
                </section>
            </div>

            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Internet Performance of Selected Country</span>
                </h2>
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <ChartLineCountryDemo
                        request={selectedOptions}
                        africa={false}
                        filter={selectedFilter}
                        chartType={"download"}
                        description={""}
                        keys={["upload", "download"]}
                        section={''}
                        shouldFetch={shouldFetch}
                    />
                </CardContent>

                <CardContent className="h-full">
                    <LineChartCityDemo
                        request={selectedOptions}
                        filter={selectedFilter}
                        shouldFetch={shouldFetch}
                        chartType={"download"}
                        description='Upload and Download over Time'
                        keys={["upload", "download"]}
                    />
                </CardContent>

                <CardContent className="h-full">
                    <ChartBarDemo
                        request={selectedOptions}
                        filter={selectedFilter}
                        keys={["download", "upload"]}
                        chartType="download"
                        shouldFetch={shouldFetch}
                    />
                </CardContent>

                <CardContent className="h-full">
                    <LineChartCityDemo
                        request={selectedOptions}
                        filter={selectedFilter}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time'
                        chartType="latency"
                    />
                </CardContent>
            </section>

            <section>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Quality of Service of Internet Service Providers</span>
                </h2>
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                <CardContent className="h-full">
                    <ChartLineISPDemo
                        request={selectedOptions}
                        shouldFetch={shouldFetch}
                        filter={selectedFilter}
                        keys={["upload", "download"]}
                        description='Upload and Download Performance over time'
                        chartType="download"
                        section={''}
                    />
                </CardContent>

                <CardContent className="h-full">
                    <ChartLineISPDemo
                        request={selectedOptions}
                        filter={selectedFilter}
                        shouldFetch={shouldFetch}
                        keys={["latency", "lossrate"]}
                        description='Latency and Packet Loss over Time'
                        chartType="latency"
                        section={''}
                    />
                </CardContent>
            </section>

            {/* Download HTML Page Button*/}
            <div className="mt-4">
                <button
                    onClick={downloadHTML}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Download Page
                </button>
            </div>
        </div>
    );
};

export default Home;
