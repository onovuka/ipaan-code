import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import {chartConfigLine as chartConfig } from "@/data/lineConfig"
import { mockLatency } from "@/data/NoISP"
// import { mockLatency as mockISP } from "@/data/NoCity"
import { useState } from "react";
import { lineISP } from "@/data/NoCities";

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
import Query from "../Tools/Request";


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
  description: string;
  keys: Array<keyof typeof chartConfig>; // New property
}


const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
];

interface LineProps {
    data: any,
    dataType: string // for what are we rendering, isp or city or summary
}

function ChartLineISP({request, shouldFetch, chartType, description, keys} : requests) {

      // State to hold fetched data
      const [data, setData] = useState<any[]>([]);


      // mockdata for response
      const [Mockdata, setMockData] = useState<any[]>([]);

      const [activeChart, setActiveChart] =
      React.useState<keyof typeof chartConfig>(
        () => chartType
      );

      const handleDataFetched = (fetchedData: any) => {
        setData(fetchedData);
    
      };


      
    // where lineType = city
    const assignColorsToisps = (isps: string[]) => {
        const ispColorMap: { [key: string]: string } = {};
        isps.forEach((isp, index) => {
          ispColorMap[isp] = colorPalette[index % colorPalette.length];
        });
        return ispColorMap;
    };

    // Extract unique cities from mockLine data
    const isps = [...new Set(lineISP.map(item => item.isp))];
    const ispColors = assignColorsToisps(isps);



    // Define a type for rest
    type Rest = {
        upload: number;
        download: number;
        latency: number;
        lossrate: number;
    };

    // Group data by date
    const groupDataByDate = () => {
        const groupedData: { [key: string]: { [key: string]: number } } = {};

        lineISP.forEach(item => {
            const { date, isp, ...rest } = item;
            if (!groupedData[date]) {
                groupedData[date] = {};
            }
            // Use type assertion to ensure `rest` has the correct type
            groupedData[date][isp] = (rest as Rest)[activeChart];
        });

        // Convert groupedData to array format suitable for LineChart
        return Object.keys(groupedData).map(date => ({
            date,
            ...groupedData[date],
        }));
    };


    // Process grouped data
    const groupedData = React.useMemo(() => groupDataByDate(), [activeChart]);

    return (
      <div>


        {shouldFetch && (
                    <Query
                        request={request}
                        api="http://196.42.86.234:3000/query/line"
                        onDataFetched={handleDataFetched}
                        shouldFetch={shouldFetch}
                    />
        )}


        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
              <CardTitle>Internet Performance Over Time</CardTitle>
              <CardDescription className="text-sm">
                {description}
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
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <LineChart
                data={groupedData} // Provide grouped data to LineChart
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
                <YAxis />
                <Tooltip />
                {isps.map(isp => (
                    <Line
                      key={isp}
                      type="monotone"
                      dataKey={isp}
                      stroke={ispColors[isp]}
                      strokeWidth={2}
                      dot={false}
                      name={isp}
                      // data={groupedData} // Ensure each line uses its specific data
                    />
                ))}
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        </div>
    );
}

export default ChartLineISP;
