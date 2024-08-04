"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect } from "react"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent} from "@/components/ui/chart"
import { chartConfig } from "./chartConfigs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { mockBar } from "@/data/MockBar"

import {bar} from "@/data/barResponse";

import Query from "../Tools/requestDemo"
import React from "react"


interface requests{
  request:{
      filters: {
      countries: string[];
      cities: string[];
      isps: string[]; 
  }
    startDate: string;
    endDate: string;

  },
  shouldFetch:boolean
  chartType: keyof typeof chartConfig; // options: download or latency
  keys: Array<keyof typeof chartConfig>; // New property
}

type TransformedData = {
  city: string;
  [isp: string]: {
    download: number;
    upload: number;
  } | string;
};


const ispColors = [
  { base: '#1f77b4', light: '#aec7e8' },
  { base: '#ff7f0e', light: '#ffbb78' },
  { base: '#2ca02c', light: '#98df8a' },
  { base: '#d62728', light: '#ff9896' },
  { base: '#9467bd', light: '#c5b0d5' },
  { base: '#8c564b', light: '#c49c94' },
];


const getIspColor = (isp: string, isUpload: boolean) => {
  const ispIndex = Array.from(new Set(bar.map(item => item.isp))).indexOf(isp);
  const colorPair = ispColors[ispIndex % ispColors.length];
  return isUpload ? colorPair.light : colorPair.base;
};




function ChartBar({request, shouldFetch, chartType, keys} : requests) {
  // State to hold fetched data
  const [data, setData] = useState<any[]>([]);
  

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);

  };

  const DEFAULT_ISP = "Telkom SA Ltd.";

  // transforming for x axis:
  const transformedData: TransformedData[] = mockBar.reduce((acc: TransformedData[], curr) => {
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
    mockBar
      .map(item => item.isp ?? "Telkom SA Ltd.") // Use "Telkom SA Ltd." if item.isp is undefined
      .filter(isp => isp !== undefined) // Ensure we remove any potential undefined values
  )];
  
  const isps = [
    ...new Set(
      mockBar.map(item => item.isp === undefined ? "Telkom SA Ltd." : item.isp)
    )
  ];

  const [activeChart, setActiveChart] =
  React.useState<keyof typeof chartConfig>(
    () => chartType
  );


const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#a8d8d8", "#d8a884"];

const getColorForIsp = (isp: string) => {
  const uniqueIsps = Array.from(new Set(
    mockBar.map(item => item.isp === undefined ? "Telkom SA Ltd." : item.isp)
  ));

  const correctedIsp = isp === undefined ? "Telkom SA Ltd." : isp;
  const index = uniqueIsps.indexOf(correctedIsp);

  
  return colors[index % colors.length];
};
    

  return (

    <div>
            {shouldFetch && (
                <Query
                    request={request}
                    api="http://196.42.86.234:3000/query/bar"
                    onDataFetched={handleDataFetched}
                    shouldFetch={shouldFetch}
                />
    )}

    <Card>

    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
              <CardTitle>Performance between cities</CardTitle>
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
          <BarChart accessibilityLayer data={transformedData}>
            
          <CartesianGrid vertical={false} />

          <XAxis
          dataKey="city"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          textAnchor="end"
          tickFormatter={(value) => value}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        
        {uniqueISPs.map((isp, index) => (
            ['download', "upload"].map((key) => (
              <Bar
              key={`${isp}-${key}`}
              dataKey={`${isp}.${key}`}
                name={`${isp} ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                fill={getColorForIsp(isp)}
                // stackId="a"
              />
            ))
          ))}

        </BarChart>


        </ChartContainer>

        </CardContent>
        

    </Card>



    </div>
  )
}

export default ChartBar;
