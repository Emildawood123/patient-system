'use client';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button";
import { useState } from "react"
import { Appointment } from "@/types/appwrite.types";
import { AppointmentForm } from "./forms/AppointmentForm";
interface AppointmentModelProps {
  type: 'schedule' | 'cancel'
  patientId: string
  userId: string
  appointment?: Appointment
  title: string
  description: string
}
//@typescript-eslint/no-unused-vars
const AppointmentModel = ({ type, patientId, userId, appointment, title, description }: AppointmentModelProps) => {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={ open} onOpenChange={setOpen}>
            <DialogTrigger className="flex" asChild>
                <Button className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>{type}</Button>
  </DialogTrigger>
  <DialogContent className="shad-dialog sm:max-w-md">
    <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="capitalize">{type} appointment</DialogTitle>
      <DialogDescription>
        Please fill in the following details to {type} appointment
      </DialogDescription>
                </DialogHeader>
          <AppointmentForm type={type} patientId={patientId} userId={ userId } appointment={appointment} setOpen={setOpen}/>
  </DialogContent>
</Dialog>
    )
}
export default AppointmentModel
