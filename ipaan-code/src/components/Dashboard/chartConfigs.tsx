import { type ChartConfig } from "@/components/ui/chart"


export const chartConfig = {
    "upload": {
      label: "upload",
      color: "#2563eb",
    },
    "download": {
      label: "download",
      color: "#60a5fa",
    },
} satisfies ChartConfig


export const chartConfigPie = {
    downloads: {
      label: "Downloads",
    },
    Nigeria: {
      label: "Nigeria",
      color: "hsl(var(--chart-1))",
    },
    SA: {
      label: "South Africa",
      color: "hsl(var(--chart-2))",
    },
    Uganda: {
      label: "Uganda",
      color: "hsl(var(--chart-3))",
    },
    Mozambique: {
      label: "Mozambique",
      color: "hsl(var(--chart-4))",
    },

  } satisfies ChartConfig