"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { chartConfig } from "./chartConfigs";
import { mockBar } from "@/data/MockBar";

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
  shouldFetch: boolean;
  chartType: keyof typeof chartConfig;
  description: string;
  keys: Array<keyof typeof chartConfig>;
}

type TransformedData = {
  city: string;
  [isp: string]: {
    download: number;
    upload: number;
  } | string;
};

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d88484", "#a8d8d8", "#d8a884"];

const getColorForIsp = (isp: string) => {
  const uniqueIsps = Array.from(new Set(
    mockBar.map(item => item.isp === undefined ? "Telkom SA Ltd." : item.isp)
  ));

  const correctedIsp = isp === undefined ? "Telkom SA Ltd." : isp;
  const index = uniqueIsps.indexOf(correctedIsp);
  
  console.log(`ISP: ${correctedIsp}, Color Index: ${index}, Color: ${colors[index % colors.length]}`);
  
  return colors[index % colors.length];
};

function ChartBar2() {
  const [data, setData] = useState<any[]>([]);

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);
  };

  const isps = [
    ...new Set(
      mockBar.map(item => item.isp === undefined ? "Telkom SA Ltd." : item.isp)
    )
  ];

  const transformedData: TransformedData[] = mockBar.reduce((acc: TransformedData[], curr) => {
    const isp = curr.isp === undefined ? "Telkom SA Ltd." : curr.isp;
    let city = acc.find(item => item.city === curr.city);
    if (!city) {
      city = { city: curr.city };
      acc.push(city);
    }
    city[isp] = { download: curr.download, upload: curr.upload };
    return acc;
  }, []);

  console.log("Transformed Data:", transformedData);

  console.log("unique iSPs",isps);

  return (
    <div>
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

          {isps.map((isp) => (
            ['download', 'upload'].map((key) => (
              <Bar
                key={`${isp}-${key}`}
                dataKey={`${isp}.${key}`}
                name={`${isp} ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                fill={getColorForIsp(isp)}
              />
            ))
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default ChartBar2;
