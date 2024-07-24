import { ChartConfig } from "@/components/ui/chart";

export const chartConfigLatencyMulti = {
	views: {
		label: "MBps",
	},

    latency: {
      label: "Latency",
    },

    loss: {
      label: "Packet loss",
    },
} satisfies ChartConfig;


export const chartConfigLatencySingle = {
	views: {
		label: "MBps",
	},

    latency: {
      label: "Latency",
      color: "hsl(var(--chart-1))",
    },

    loss: {
      label: "Packet loss",
      color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;


export const chartConfigOverTimeSingle = {
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


export const chartConfigOverTimeMulti = {
	views: {
		label: "MBps",
	  },

    upload: {
      label: "Upload",

    },

    download: {
      label: "Download",
    },

} satisfies ChartConfig;


export const chartConfigLine = {
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

    latency:{
      label: "Latency",
      color: "hsl(var(--chart-1))",
    },

    lossrate:{
        label: "Packet Loss",
        color: "hsl(var(--chart-2))",
    }

} satisfies ChartConfig;