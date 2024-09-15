import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Info } from "lucide-react"

import { definitions } from "@/data/Info"

import React from "react";
  

interface popupProps{
    term: string
}

  
export function Infopopup( {term} : popupProps) {
    const definition1 = definitions.find(item => item.term === term)?.definition1;

    const definition2 = definitions.find(item => item.term === term)?.definition2;

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>

          <Info 

          size={15}
          
          />

        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>What does this mean?</AlertDialogTitle>
            <AlertDialogDescription>

            <div className="flex flex-col items-center space-y-4">
                <div>
                  {definition1}
                </div>
                <div>
                  {definition2}
                </div>
            </div>

            </AlertDialogDescription>

          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Exit</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  