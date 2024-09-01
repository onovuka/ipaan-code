import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { chartConfigLine as chartConfig } from "@/data/lineConfig";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

import Query from "../Tools/Request";

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
  description: string;
  keys: Array<keyof typeof chartConfig>;
  section: string; 
  shouldFetch: boolean
}

const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

function ChartLineISPDemo({chartType, description, keys, request, shouldFetch }: Requests) {
  const [data, setData] = useState<any[]>([]);
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(chartType);

  const updatedRequest = {
    filters: {
      countries: [], 
      cities: [], 
      isps: request.filters.isps,  
    },
    startDate: request.startDate,
    endDate: request.endDate,   
  };

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);
  };

  const assignColorsToisps = (isps: string[]) => {
    const ispColorMap: { [key: string]: string } = {};
    isps.forEach((isp, index) => {
      ispColorMap[isp] = colorPalette[index % colorPalette.length];
    });
    return ispColorMap;
  };

  const isps = [...new Set(data.map(item => item.isp))];
  const ispColors = assignColorsToisps(isps);

  type Rest = {
    upload: number;
    download: number;
    latency: number;
    lossrate: number;
  };

  const groupDataByDate = () => {
    const groupedData: { [key: string]: { [key: string]: number } } = {};

    data.forEach(item => {
      const { date, isp, ...rest } = item;
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      groupedData[date][isp] = (rest as Rest)[activeChart];
    });

    return Object.keys(groupedData).map(date => ({
      date,
      ...groupedData[date],
    }));
  };

  const groupedData = React.useMemo(() => groupDataByDate(), [data, activeChart]);

  // Determine YAxis label based on chartType
  const yAxisLabel = React.useMemo(() => {
    switch (activeChart) {
      case "upload":
      case "download":
        return "MBps";
      case "lossrate":
        return "Percentage (%)";
      case "latency":
        return "MinRTT (ms)";
      default:
        return "";
    }
  }, [activeChart]);

  // Defining the domain of the y-axis based on the type of chart and maximum metrics received.
  const yAxisDomain = React.useMemo(() => {
    const maxValue = data.reduce((max, item) => {
      if (activeChart === "lossrate") {
        return Math.max(max, item.lossrate || 0);
      } else if (activeChart === "download") {
        return Math.max(max, item.download || 0);
      } else if (activeChart === "upload") {
        return Math.max(max, item.upload || 0);
      } else if (activeChart === "latency") {
        return Math.max(max, item.latency || 0);
      }
      return max;
    }, 0);

    if (activeChart === "lossrate") {
      return [0, maxValue + 10];
    } else if (activeChart === "download" || activeChart === "upload" || activeChart === "latency") {
      return [0, maxValue + 30];
    } else {
      return [0, 500];
    }
  }, [activeChart, data]);

  return (
    <div>
      {shouldFetch && (
        <Query
          request={updatedRequest}
          api="http://137.158.60.110:3000/query/line"
          onDataFetched={handleDataFetched}
          shouldFetch={shouldFetch}
        />
      )}

      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row h-[100px]">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-center">
            <CardTitle>
              Internet Service Provider Performance Over Time
            </CardTitle>

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
              data={groupedData}
              margin={{ left: 12, right: 12 }}
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
                    year: "numeric"
                  });
                }}
              />
              <YAxis
                label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
                domain={yAxisDomain} // Apply the computed domain
              />
              <Tooltip />
              <Legend />
              {isps.map(isp => (
                <Line
                  key={isp}
                  type="monotone"
                  dataKey={isp}
                  stroke={ispColors[isp]}
                  strokeWidth={2}
                  dot={false}
                  name={isp}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChartLineISPDemo;
