"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect } from "react"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent} from "@/components/ui/chart"
import { chartConfig } from "./chartConfigs"
import { mockBar } from "@/data/BarData"
// import { bar } from "@/data/BarData"

import {bar} from "@/data/barResponse";

import Query from "../Tools/requestDemo"


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
  chartType:string
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




function ChartBar({request, shouldFetch, chartType} : requests) {
  // State to hold fetched data
  const [data, setData] = useState<any[]>([]);
  

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);

  };

  const adjustedRequest = { ...request };
  if (chartType === "city") {
    adjustedRequest.filters.isps = [];
  }


  // transforming for x axis:
  const transformedData: TransformedData[] = bar.reduce((acc: TransformedData[], curr) => {
    let city = acc.find(item => item.city === curr.city);
    if (!city) {
      city = { city: curr.city };
      acc.push(city);
    }
    city[curr.isp] = { download: curr.download, upload: curr.upload };
    return acc;
  }, []);


  const getColorForIsp = (isp: string) => {
    // Create a consistent mapping based on ISP names
    const ispNames = Array.from(new Set(bar.map(item => item.isp)));
    const index = ispNames.indexOf(isp);
    return colors[index % colors.length];
  };


  const uniqueISPs: string[] = [...new Set(bar.map(item => item.isp))];
  

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#a8d8d8", "#d8a884"];

  

  console.log("Transformed Data:", JSON.stringify(transformedData, null, 2));

  console.log("Unique isps", JSON.stringify(uniqueISPs, null, 2));
  

  return (

    <div>
            {shouldFetch && (
                <Query
                    request={request}
                    api="http://196.210.49.222:3000/query/bar"
                    onDataFetched={handleDataFetched}
                    shouldFetch={shouldFetch}
                />
    )}

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
        ['download'].map((key) => (
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

    </div>
  )
}

export default ChartBar;
