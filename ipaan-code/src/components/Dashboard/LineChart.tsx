"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { chartConfigLine as chartConfig } from "@/data/summaryLine"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



interface Props{
    data: any,
    chartType: keyof typeof chartConfig,
    keys: Array<keyof typeof chartConfig>;

    // keys: string[]
}


interface LineProps{
  data: any,

}

export function ChartLine({data, chartType, keys} : Props) {


  const [activeChart, setActiveChart] =
  React.useState<keyof typeof chartConfig>(
    () => chartType
  );


  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
          <CardTitle >Internet Performance Over Time</CardTitle>
          <CardDescription className="text-sm">
            Performance in the last 3 months since updated
          </CardDescription>
        </div>
        <div className="flex">
          {keys.map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}

              label={{
                value: "Date",
                position: "bottom",
                offset: 10, // Adjust label offset
              }}
            />

          <YAxis
            domain={['auto', 'auto']} // Adjust as needed or use specific values
            tickFormatter={(value) => value.toFixed(2)} // Format tick labels
            label={{
              value: "MBps",
              angle: -90, // Rotate label to vertical
              position: "left",
              offset: 10, // Adjust label offset
            }}
          />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />

          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
