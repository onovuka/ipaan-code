"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState } from "react"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent} from "@/components/ui/chart"
import { chartConfig } from "./chartConfigs"
import { mockBar } from "@/data/BarData"

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

  }
}





function ChartBar({request} : requests) {
  const [data, setData] = useState<any[]>([]); // State to hold fetched data

  const handleDataFetched = (fetchedData: any) => {
    // Ensure the data is in the correct format for the chart
    if (Array.isArray(fetchedData)) {
      setData(fetchedData);
      console.log(data)
    } else {
      console.error('Unexpected data format:', fetchedData);
    }
  };
  

  return (

    <div>
      <Query
              request={request}
              api='http://196.42.81.143:3000/execute-query/bar'
              onDataFetched={handleDataFetched}
      />

    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={mockBar}>
        
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
    
      <Bar dataKey="download" fill="var(--color-download)" radius={4} />
      <Bar dataKey="upload" fill="var(--color-upload)" radius={4} />

      </BarChart>
    </ChartContainer>

    </div>
  )
}

export default ChartBar;
