import { ChartConfig } from "@/components/ui/chart";

export const chartConfigPie = {
	views: {
		label: "MBps",
	},

    upload: {
      label: "Latency",
	  color: "hsl(var(--chart-1))",
    },
    download: {
      label: "Packet loss",
	  color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;




interface PieData {
    chartType: string;
    country: string;
    value: number;
    colour: string
}

export const mockPie: PieData[] = [
    { chartType: "uploads", country: "Nigeria", value: 275, colour: "hsl(var(--chart-1))" },
    { chartType: "uploads", country: "South Africa", value: 25, colour: "hsl(var(--chart-2))" },
    { chartType: "uploads", country: "Uganda", value: 67, colour: "hsl(var(--chart-3))" },
    { chartType: "uploads", country: "Mozambique", value: 99, colour:"hsl(var(--chart-4))" },
  ];