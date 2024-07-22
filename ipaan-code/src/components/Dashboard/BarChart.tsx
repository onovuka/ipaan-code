"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect } from "react"

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

  },
  fetch:boolean
  barID:number
}




function ChartBar({request, fetch, barID} : requests) {
  // State to hold fetched data
  const [data, setData] = useState<any[]>([]);
  

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);

  };

  

  return (

    <div>
      {fetch && (
            <Query
              request={request}
              api='http://196.210.49.222:3000/query/bar'
              onDataFetched={handleDataFetched}
      />
    )}

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
