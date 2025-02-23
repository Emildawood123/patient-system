"use client"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { StatusBadge } from "../statusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import AppointmentModel from "../AppointmentModel"
import { Appointment } from "@/types/appwrite.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Appointment>[] = [
     {
    accessorKey: "ID",
        cell: ({ row }) => <p className="text-14-medium">{ row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
      header: "Patient",
      cell: ({ row }) => {
          const appointment = row.original
          return (
              <p className="text-14-medium">{ appointment.patient.name}</p>
          )
      }
  },
  {
    accessorKey: "status",
      header: "Status",
    cell: ({ row }) => {
        return (<div className="min-w-[115px]">
            <StatusBadge status={ row.original.status} />
          </div>)
      }
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      )
    }
  },
  {
    accessorKey: "primaryPhysician",
    header: () => 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)
      return (
        <div className="flex gap-2 items-center justify-center">
          <Image src={doctor?.image} width={23} height={23} alt="doctorName"/>
          <p className="whitespace-nowrap">Dr. { doctor?.name}</p>
        </div>
      )
    }
  },
    {
      id: "actions",
      header: () => <div className="pl-4 ">Actions</div>,
      cell: ({ row: { original: data} } ) => {
      return (
        <div className="flex gap-1">
          <AppointmentModel type="schedule" patientId={data.patient.$id} userId={data.userId} appointment={data} title="schedule appointment" description="Please check the following details for schedule"/>
          <AppointmentModel type="cancel" patientId={data.patient.$id} userId={data.userId} appointment={data} title="cancel appointment" description="Are you sure to cancel this appointment ?"/>
        </div>
      )
    },
  },
 

]
