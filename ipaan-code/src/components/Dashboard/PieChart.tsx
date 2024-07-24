
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { chartConfigPie } from "./chartConfigs"
import { mockPie } from "@/data/PieChartData"
import Query from "../Tools/requestDemo"
import { useState } from "react"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


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



function ChartPie({request, shouldFetch, chartType} : requests) {


  const [data, setData] = useState<any[]>([]);

  const handleDataFetched = (fetchedData: any) => {
    setData(fetchedData);

  };

    // total collected
  const totalData = React.useMemo(() => {
    return mockPie.reduce((acc, curr) => acc + curr.value, 0)
  }, [])






  return (

    <div>

    {shouldFetch && (
                <Query
                    request={request}
                    api="http://196.210.49.222:3000/query/pie"
                    onDataFetched={handleDataFetched}
                    shouldFetch={shouldFetch}
                />
    )}




    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        {/*Change*/}
        <CardTitle>Total {chartType}</CardTitle>

        {/* Change */}
        <CardDescription>Number of {chartType} in selected range</CardDescription>

      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfigPie}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
            
            // Change dataKey and nameKey dynamically
              data={mockPie}
              dataKey="value"
              nameKey="country"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalData.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Downloads
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Downloads <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Downloads from each country
        </div>
      </CardFooter>
    </Card>

    </div>
  )
}

export default ChartPie;