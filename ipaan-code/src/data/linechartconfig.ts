
import { ChartConfig } from "@/components/ui/chart";


// dynamically change config according to type of
export const chartConfigLine = {

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


