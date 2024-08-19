// src/components/FullScreenModal.js
import React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



// full screen of the card is shown when button clicked

interface PopupProps {
    isOpen: boolean; // Boolean prop to control the dialog visibility
    onClose: () => void; // Callback function to close the dialog
    content: React.ReactNode; // Custom content to render inside the dialog
}

export function ZoomData({isOpen, onClose, content}: PopupProps){

    return(
        <AlertDialog open={isOpen} onOpenChange={onClose}>

            <AlertDialogContent>
                {content}
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )

}