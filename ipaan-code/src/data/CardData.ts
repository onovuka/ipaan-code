import { Calendar, Download, LucideIcon, Pen, Upload } from "lucide-react";

export interface cardProp{
    label: string;
    icon: LucideIcon;
    total: string;
    discription: string
}

export const cardData: cardProp[] = [
    {
        label: "Date",
        total: "12 March 2024",
        icon: Calendar,
        discription: "Date last updated"
    },
    {
        label: "Tests",
        total: "17247741",
        icon: Pen,
        discription: "Total tests collected"
    },
    {
        label: "Upload",
        total: "15.58MBps",
        icon: Upload,
        discription: "Average upload speed"
    },
    {
        label: "Download",
        total: "25.83MBPs",
        icon: Download,
        discription: "Average download speed"
    },
]