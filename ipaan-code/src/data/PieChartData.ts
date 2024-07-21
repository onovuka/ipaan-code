
interface PieData {
    chartType: string;
    country: string;
    value: number;
    colour: string
}

export const mockPie: PieData[] = [
    { chartType: "uploads", country: "Nigeria", value: 275, colour: "#60a5fa" },
    { chartType: "uploads", country: "South Africa", value: 25, colour: "#f473b9" },
    { chartType: "uploads", country: "Uganda", value: 67, colour: "#38a3a5" },
    { chartType: "uploads", country: "Mozambique", value: 99, colour: "#ffc107" },
  ];