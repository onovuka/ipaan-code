import { ChartConfig } from "@/components/ui/chart";

export const chartConfigLatencyLoss = {
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


export const chartConfigOverTime = {
	views: {
		label: "MBps",
	  },

    upload: {
      label: "Upload",
	  color: "hsl(var(--chart-1))",
    },
    download: {
      label: "Download",
	  color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;


