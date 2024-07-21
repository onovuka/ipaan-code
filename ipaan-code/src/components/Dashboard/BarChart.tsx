"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent} from "@/components/ui/chart"
import { chartConfig } from "./chartConfigs"
import { mockBar } from "@/data/BarData"



function ChartBar() {

  return (
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
  )
}

export default ChartBar;
