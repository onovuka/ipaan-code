"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type Selected = string

interface DropdownMenuCheckboxesProps {
  isps: string[]
}

export function DropdownMenuCheckboxes({ isps }: DropdownMenuCheckboxesProps) {
  const [selectedISP, setSelectedISP] = React.useState<Selected>("")

  const handleSelectISP = (value: Selected) => {
    setSelectedISP(value)
  }

  // Determine the button text based on the selected ISP
  const buttonText = selectedISP ? `Selected ISP: ${selectedISP}` : "Select ISP"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select ISP</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isps.map((isp, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleSelectISP(isp)}
            className={`p-2 cursor-pointer ${selectedISP === isp ? "bg-blue-500 text-white" : ""}`}
          >
            {isp}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
