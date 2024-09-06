import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { broadbandData } from "@/data/broadband_data_africa";
import ReactCountryFlag from "react-country-flag"
import { Value } from "@radix-ui/react-select";

// for currency conversion
interface CurrencyPair {
  currency: string;
  exchange: number;
}

export function Pricelist() {
  const [priceType, setPriceType] = useState<'Average' | 'Cheapest' | 'Expensive'>('Average');

  const [currency, setCurrency] = useState<string>("USD");

  const [exchangeRate, setExchangeRate] = useState<number>(1);


  const currencies: string[] = broadbandData.map(data => data.Currency);

  const currencyPairs: CurrencyPair[] = broadbandData.map(data => ({
    currency: data.Currency,
    exchange: data.exchange
  }));


  // Convert local currency prices to USD
  const basePrices = broadbandData.map((item) => ({
    ...item,
    AverageUSD: item.Average * item.exchange,
    CheapestUSD: item.Cheapest * item.exchange,
    ExpensiveUSD: item.Expensive * item.exchange
  }));

  const handlePriceTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceType(event.target.value as 'Average' | 'Cheapest' | 'Expensive');
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };






  return (
    <div className="bg-white shadow-md rounded-lg h-[500px] flex flex-col">
      {/* Card Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-xl text-center font-semibold">Broadband Package prices per Country</h3>
        <select
          className="bg-gray-200 text-gray py-1 px-3 rounded hover:bg-blue-600"
          value={priceType}
          onChange={handlePriceTypeChange}
        >
          <option value="Average">Average Price</option>
          <option value="Cheapest">Cheapest Price</option>
          <option value="Expensive">Most Expensive Price</option>

        </select>


        {/* <select
          className="bg-gray-200 text-gray py-1 px-3 rounded hover:bg-blue-600"
          onChange={handleCurrencyChange}     
        >
            {currencies.map((currency, index) => (
              <option 
                key={index} 
                value={currency}                
                >
                {currency}
              </option>
            ))}
        </select> */}


      </div>

{/* Scrollable Area */}
<ScrollArea className="flex-1 overflow-auto rounded-b-md border-t">
  <div className="p-4">
    {basePrices.map((item) => (
      <React.Fragment key={item.Country}>
        <div className="flex items-center justify-between text-sm py-2">
          <div className="flex items-center space-x-2">
            <ReactCountryFlag
              countryCode={String(item.Countrycode)}
              svg
              style={{
                width: '2em',
                height: '2em',
              }}
              title={item.Country}
            />
            <span>{item.Country}</span>
          </div>
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
