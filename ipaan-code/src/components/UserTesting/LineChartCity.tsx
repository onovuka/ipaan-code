import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { chartConfigLine as chartConfig } from "@/data/lineConfig";
import { useEffect, useState } from "react";

import { Infopopup } from "../Tools/Infopopup";

import Query from "../Tools/requestDemo";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { ChartContainer } from "@/components/ui/chart";

interface Requests {
  request: {
    filters: {
      countries: string[];
      cities: string[];
      isps: string[];
    };
    startDate: string;
    endDate: string;
  };
  filter: string; // name of country selected for mock data
  chartType: keyof typeof chartConfig; // options: download, latency, lossrate
  description: string;
  keys: Array<keyof typeof chartConfig>; // New property
  shouldFetch: boolean
}

const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

function LineChartCityDemo({ chartType, request, keys, shouldFetch }: Requests) {
  // State to hold fetched data
  const [data, setData] = useState<any[]>([]);

  const updatedRequest = {
    filters: {
        countries: [], 
        cities: request.filters.cities, 
        isps: [],   
    },
    startDate: request.startDate, 
    endDate: request.endDate,     
  };

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);
    console.log(data);
  };


  const [hover, isHover] = useState<Boolean>(false);

  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    if (chartType === "download") {
      setTerm("Download Speed");
    } else if (chartType === "latency") {
      setTerm("latency");
    }
  }, [chartType]);


  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(chartType);

  const assignColorsToCities = (cities: string[]) => {
    const cityColorMap: { [key: string]: string } = {};
    cities.forEach((city, index) => {
      cityColorMap[city] = colorPalette[index % colorPalette.length];
    });
    return cityColorMap;
  };

  const cities = [...new Set(data.map(item => item.city))];
  const cityColors = assignColorsToCities(cities);

  type Rest = {
    upload: number;
    download: number;
    latency: number;
    lossrate: number;
  };

  const groupDataByDate = () => {
    const groupedData: { [key: string]: { [key: string]: number } } = {};

    data.forEach(item => {
      const { date, city, ...rest } = item;
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      groupedData[date][city] = (rest as Rest)[activeChart];
    });

    return Object.keys(groupedData).map(date => ({
      date,
      ...groupedData[date],
    }));
  };

  const groupedData = React.useMemo(() => groupDataByDate(), [data, activeChart]);

  // Determine YAxis domain and label based on chartType
  const yAxisDomain = React.useMemo(() => {
    if (activeChart === "lossrate") {
      return [0, 50];
    } else if (activeChart === "download" || activeChart === "upload") {
      return [0, 250];
    } else if (activeChart === "latency") {

      return [0, 500];
    } else {

      return [0, 500];
    }
  }, [activeChart, data]);

  const yAxisLabel = React.useMemo(() => {
    switch (activeChart) {
      case "upload":
      case "download":
        return "MBps";
      case "lossrate":
        return "Percentage (%)";
      case "latency":
        return "MinRTT (ms)"; // Update the label to reflect MinRTT
      default:
        return "";
    }
  }, [activeChart])

  return (

    <div>

      {shouldFetch && (
                      <Query
                          request={updatedRequest}
                          api="http://137.158.60.110:3000/query/line"
                          onDataFetched={handleDataFetched}
                          shouldFetch={shouldFetch}
                      />
          )}


    <Card className="h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
          
          <CardTitle>

            <span

                className="cursor-pointer text-gray-600"
                onMouseEnter={() => isHover(true)}
                onMouseLeave={() => isHover(false)}
            
            >


            <Infopopup

                term = {term}

              />

              </span>
            
            
            
            Internet Performance Over Time
            
            
            
            </CardTitle>
          <CardDescription className="text-sm">
            Per City Statistic
          </CardDescription>
        </div>
        <div className="flex">
          {keys.map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-center even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-2 sm:p-6 w-full flex flex-col">
        <ChartContainer
          config={chartConfig}
          className="flex-1 w-full"
        >
          <LineChart
            data={groupedData}
            margin={{ left: 12, right: 12 }}
            className="w-full h-full"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis domain={yAxisDomain} label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip />

            <Legend />

            {cities.map(city => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={cityColors[city]}
                strokeWidth={2}
                dot={false}
                name={city}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  );
}

export default LineChartCityDemo;
