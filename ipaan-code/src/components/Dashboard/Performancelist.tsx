//  A list of Top performing ISPs in Africa

import { Wifi } from "lucide-react";


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function TopIsps (){

    return(
        <div>
            <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Top Performing ISPs</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">

                <Wifi/>
                
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>


              <div className="flex items-center gap-4">
              <Wifi/>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>

              <div className="flex items-center gap-4">
                <Wifi
                />

                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>


              <div className="flex items-center gap-4">

                 <Wifi/>


                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>


              <div className="flex items-center gap-4">

                <Wifi/>

                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>

                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>

              <div className="flex items-center gap-4">

              <Wifi/>

                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>

                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>



            </CardContent>
          </Card>

        </div>
    )

}

export default TopIsps;
