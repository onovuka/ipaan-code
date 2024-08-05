import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { chartConfigLine as chartConfig } from "@/data/lineConfig";
import { useEffect, useState } from "react";
import { ZAisp } from "@/data/User_Testing/ZAR";
import { NGisp } from "@/data/User_Testing/NG";
import { KEisp } from "@/data/User_Testing/KE";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

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
  filter: string; // name of country selected for mock data
  chartType: keyof typeof chartConfig; // options: download or latency
  description: string;
  keys: Array<keyof typeof chartConfig>; // New property
  section: string; // country / city / isp
}

const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

function ChartLineISPDemo({ filter, chartType, description, keys }: Requests) {
  // State to hold fetched data
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Update data based on the filter
    switch (filter) {
      case "ZA":
        setData(ZAisp);
        break;
      case "NG":
        setData(NGisp);
        break;
      case "KE":
        setData(KEisp);
        break;
      default:
        setData([]); // or some default data
        break;
    }
  }, [filter]);

  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(
    () => chartType
  );

  const assignColorsToisps = (isps: string[]) => {
    const ispColorMap: { [key: string]: string } = {};
    isps.forEach((isp, index) => {
      ispColorMap[isp] = colorPalette[index % colorPalette.length];
    });
    return ispColorMap;
  };

  // Extract unique ISPs from data
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

  // Determine YAxis domain and label based on chartType
  const yAxisLabel = React.useMemo(() => {
    switch (activeChart) {
      case "upload":
      case "download":
        return "MBps";
      case "lossrate":
        return "Percentage (%)";
      default:
        return "";
    }
  }, [activeChart]);

  return (
    <div>
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
                  });
                }}
              />
              <YAxis
                label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
                domain={activeChart === "lossrate" ? [0, 20] : [0, 100]}
              />
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
