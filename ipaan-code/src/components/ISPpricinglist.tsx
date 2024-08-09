import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { broadbandData } from "@/data/broadband_data_africa";

export function Pricelist() {
  const [priceType, setPriceType] = useState<'Average' | 'Cheapest' | 'Expensive'>('Average');

  // Convert local currency prices to USD
  const convertedData = broadbandData.map((item) => ({
    ...item,
    AverageUSD: item.Average * item.exchange,
    CheapestUSD: item.Cheapest * item.exchange,
    ExpensiveUSD: item.Expensive * item.exchange
  }));

  const handlePriceTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceType(event.target.value as 'Average' | 'Cheapest' | 'Expensive');
  };

  return (
    <div className="bg-white shadow-md rounded-lg h-[500px] flex flex-col">
      {/* Card Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-xl font-semibold">Broadband Prices per Country</h3>
        <select
          className="bg-gray-200 text-gray py-1 px-3 rounded hover:bg-blue-600"
          value={priceType}
          onChange={handlePriceTypeChange}
        >
          <option value="Average">Average Price</option>
          <option value="Cheapest">Cheapest Price</option>
          <option value="Expensive">Most Expensive Price</option>
        </select>
      </div>

      {/* Scrollable Area */}
      <ScrollArea className="flex-1 overflow-auto rounded-b-md border-t">
        <div className="p-4">
          {convertedData.map((item) => (
            <React.Fragment key={item.Country}>
              <div className="flex justify-between text-sm py-2">
                <span>{item.Country}</span>
                <span>
                  ${item[`${priceType}USD`].toFixed(2)}
                </span>
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
