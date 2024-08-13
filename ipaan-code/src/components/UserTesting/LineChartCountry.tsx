import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { chartConfigLine as chartConfig } from "@/data/lineConfig";
import { useEffect, useState } from "react";
import { lineCountry as lineZA } from "../../data/User_Testing/ZAR";
import { lineKE } from "../../data/User_Testing/KE";
import { LineNG } from "@/data/User_Testing/NG";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

// Fetching data from the API:
import Query from "../Tools/requestDemo"

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
  chartType: keyof typeof chartConfig; // options: download or latency
  description: string;
  keys: Array<keyof typeof chartConfig>; // New property
  section: string; 
  shouldFetch: boolean;
}

const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

function ChartLineCountryDemo({ filter, chartType, request, keys, shouldFetch }: Requests) {
  const [data, setData] = useState<any[]>([]);

  const [realData, setReal] = useState<any[]>([]);

  const updatedRequest = {
    filters: {
        countries: request.filters.countries, // Preserve existing countries or set as needed
        cities: [], // Set to empty
        isps: [],   // Set to empty
    },
    startDate: request.startDate, // Preserve existing startDate or set as needed
    endDate: request.endDate,     // Preserve existing endDate or set as needed
  };

  const handleDataFetched = (fetchedData: any) => {
    setReal(fetchedData);
  };




  useEffect(() => {
    // Update data based on the filter
    switch (filter) {
      case "ZA":
        setData(lineZA);
        break;
      case "NG":
        setData(LineNG);
        break;
      case "KE":
        setData(lineKE);
        break;
      default:
        setData([]); // or some default data
        break;
    }
  }, [filter]);

  // Log data to verify it
  useEffect(() => {
    console.log(data);
  }, [data]);

  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(chartType);

  const assignColorsToCountries = (countries: string[]) => {
    const countryColorMap: { [key: string]: string } = {};
    countries.forEach((country, index) => {
      countryColorMap[country] = colorPalette[index % colorPalette.length];
    });
    return countryColorMap;
  };

  const countries = [...new Set(data.map(item => item.countrycode))];
  const countryColors = assignColorsToCountries(countries);

  type Rest = {
    upload: number;
    download: number;
    latency: number;
    lossrate: number;
  };

  const groupDataByDate = () => {
    const groupedData: { [key: string]: { [key: string]: number } } = {};

    data.forEach(item => {
      const { date, countrycode, ...rest } = item;
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      groupedData[date][countrycode] = (rest as Rest)[activeChart];
    });

    return Object.keys(groupedData).map(date => ({
      date,
      ...groupedData[date],
    }));
  };

  const groupedData = React.useMemo(() => groupDataByDate(), [activeChart, data]);

  return (

    <div>

      {shouldFetch && (
                      <Query
                          request={updatedRequest}
                          api="http://196.42.86.234:3000/query/line"
                          onDataFetched={handleDataFetched}
                          shouldFetch={shouldFetch}
                      />
          )}

      <Card className="h-full">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
            
            <CardTitle>

              Internet Performance Over Time
              
              </CardTitle>

            <CardDescription className="text-sm">
              Country Statistic
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
              data={groupedData} // Provide grouped data to LineChart
              margin={{ left: 12, right: 12 }}
              className="w-full"
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
              <YAxis domain={[0,100]} label={{ value: "MBps", angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              {countries.map(country => (
                <Line
                  key={country}
                  type="monotone"
                  dataKey={country}
                  stroke={countryColors[country]}
                  strokeWidth={2}
                  dot={false}
                  name={country}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  );
}

export default ChartLineCountryDemo;
