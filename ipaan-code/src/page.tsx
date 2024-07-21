"use client"
import Card, {CardContent} from "@/components/Tools/Card";
import { cardData } from "./data/CardData";
// import ChartBar from "./components/Dashboard/BarChart";
import ChartPie from "./components/Dashboard/PieChart";
import { ChartLine } from "./components/Dashboard/LineChart";
import Header from './components/Header'
import Filters from "./components/Tools/SelectFilters";
// import MapChart from "./components/Dashboard/Map";




function Home(){
    return(
        <div className="flex flex-col gap-5  w-full">

            <Header/>

            <Filters/>

            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                    {cardData.map((d, i) => (
                    <Card
                        key={i}
                        total={d.total}
                        discription={d.discription}
                        icon={d.icon}
                        label={d.label}
                    />
                    ))}
            </section>


        <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent >

            <ChartLine/>

        </CardContent >

        
            <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
            <ChartPie className="flex justify-between gap-4 h-1/2"/>
            <ChartPie className="flex justify-between gap-4 h-1/2"/>
            </section>

          
        </section>



        </div>

    );
}
export default Home;