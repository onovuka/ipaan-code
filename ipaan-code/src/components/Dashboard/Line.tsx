
// Final Line chart

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { chartConfigLine } from "@/data/linechartconfig";
import { mockLine } from "@/data/internet_data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
];

interface LineProps{
    data: any,
    dataType: string // for what are we rendering, isp or city or summary
}




function ChartLine2(){

    const assignColorsToCities = (cities: string[]) => {
        const cityColorMap: { [key: string]: string } = {};
        cities.forEach((city, index) => {
          cityColorMap[city] = colorPalette[index % colorPalette.length];
        });
        return cityColorMap;
      };

    // Extract unique cities from mockLine data
    const cities = [...new Set(mockLine.map(item => item.city))];
    const cityColors = assignColorsToCities(cities);



    // const[lines, setLines] = React.useState<string[]>([]);

    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfigLine>("download");


    const cityDataMap = React.useMemo(() => {
        return cities.reduce((acc, city) => {
          acc[city] = mockLine.filter(d => d.city === city);
          return acc;
        }, {} as { [city: string]: typeof mockLine });
      }, [cities]);

      console.log("cityDataMap:", cityDataMap);

    return (
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
              <CardTitle>Internet Performance Over Time</CardTitle>
              <CardDescription className="text-sm">
                Performance in the last 3 months since updated
              </CardDescription>
            </div>
            <div className="flex">
              {["upload", "download"].map((key) => {
                const chart = key as keyof typeof chartConfigLine;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfigLine[chart].label}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfigLine}
              className="aspect-auto h-[250px] w-full"
            >
              <LineChart
                accessibilityLayer
                // data={mockLine}
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
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />

                
        <Tooltip />
        {cities.map(city => {
                console.log("Rendering city:", city, cityDataMap[city]);
                return (
                    <Line
                    key={city}
                    type="monotone"
                    dataKey={activeChart}
                    stroke={cityColors[city]}
                    strokeWidth={2}
                    dot={false}
                    name={city}
                    data={cityDataMap[city]} // Ensure each line uses its specific data
                    />
                );
                })}
        





          </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );
}

export default ChartLine2;