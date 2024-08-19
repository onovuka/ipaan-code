/** @format */

import React from "react";
import { cn } from "@/lib/utils";
import { cardProp } from "@/data/CardData";


export default function Card(props: cardProp) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm font-sans font-semibold">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1 text-center">
        <h2 className="text-2xl font-semibold">{props.total}</h2>
        <p className="text-xs text-gray-500">{props.discription}</p>
      </section>
    </CardContent>
  );
}


export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}