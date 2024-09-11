"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";
import { useState } from "react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { chartConfig } from "../../chartConfigs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Query from "../Tools/Request"

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
  filter: string; 
  chartType: keyof typeof chartConfig; 
  keys: Array<keyof typeof chartConfig>; 
  shouldFetch: boolean 
}

type TransformedData = {
  city: string;
  [isp: string]: {
    download: number;
    upload: number;
  } | string;
};

function ChartBarDemo({ chartType, request, keys, shouldFetch }: Requests) {
  // State to hold fetched data
  const [data, setData] = useState<any[]>([]);

  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>(chartType);


  const updatedRequest = {
    filters: {
        countries: [], 
        cities: request.filters.cities, 
        isps: request.filters.isps,   
    },
    startDate: request.startDate, 
    endDate: request.endDate,     
  };

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);
  };

  

  // Telkom ISP is undefined in api response -> set default for chart
  const DEFAULT_ISP = "Telkom SA Ltd.";

  // Transforms the data for x axis
  const transformedData: TransformedData[] = data.reduce((acc: TransformedData[], curr) => {
    const isp = curr.isp ?? DEFAULT_ISP;

    let city = acc.find(item => item.city === curr.city);
    if (!city) {
      city = { city: curr.city };
      acc.push(city);
    }

    city[isp] = { download: curr.download, upload: curr.upload };
    return acc;
  }, []);

  const uniqueISPs: string[] = [...new Set(
    data
      .map(item => item.isp ?? DEFAULT_ISP) 
      .filter(isp => isp !== undefined) 
  )];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#a8d8d8", "#d8a884"];

  const getColorForIsp = (isp: string) => {
    const index = uniqueISPs.indexOf(isp);
    return colors[index % colors.length];
  };

  return (
    <div>

    {shouldFetch && (
                <Query
                    request={updatedRequest}
                    api="http://137.158.62.185:3000/query/bar"
                    onDataFetched={handleDataFetched}
                    shouldFetch={shouldFetch}
                />
    )}



      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
            <CardTitle>
              Internet Performance of ISPs Across Selected Cities
            </CardTitle>

            <CardDescription className="text-sm">
              Upload and Download Speed
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

        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={transformedData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="city"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <YAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} MBps`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend 
                wrapperStyle={{ padding: '10px' }}
                formatter={(value) => <span>{value}</span>} 
              />

              {uniqueISPs.map((isp) =>
                (activeChart === "download" || activeChart === "upload") ? (
                  <Bar
                    key={`${isp}-${activeChart}`}
                    dataKey={`${isp}.${activeChart}`}
                    name={isp} // Only ISP name
                    fill={getColorForIsp(isp)}
                    barSize={20}
                  />
                ) : null
              )}

              {transformedData.map((entry, index) => (
                <Label
                  key={`city-${index}`}
                  position="insideTop"
                  fill="#000"
                  fontSize={14}
                  offset={0}
                  value={entry.city}
                  textAnchor="middle"
                  x={(index + 0.5) * 20}
                  y={0} 
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChartBarDemo;
