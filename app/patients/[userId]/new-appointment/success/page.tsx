import Link from "next/link"
import Image  from "next/image"
import { getAppointment } from "@/lib/actions/appointment.actions"
import { Doctors } from "@/constants"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || ''
    const appointment = await getAppointment(appointmentId)
    console.log(appointment.primaryPhysician)
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician
    )
    console.log(doctor)
    return (
        <div className="flex h-screen h-max-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Image
                        alt="logo"
                        src="/assets/icons/logo-full.svg"
                        height={1000} width={1000}
                        className="w-fit h-10"/>
                </Link>
                <section className="flex flex-col items-center">
                    <Image src="/assets/gifs/success.gif" width={280} height={300} alt="success" />
                
                <h2 className="header mb-6 max-w-[600px] text-center">
                    Your <span className="text-green-500">oppointment request</span> has been successfully submitted!
                </h2>
                <p>we&apos;ll be in touch shortly to confirm.</p>
                </section>
                <section className="request-details">
                    <p>Requested appointment details:</p>
                    <div className="flex items-center gap-3">
                        <Image src={doctor?.image || "/assets/image/admin.svg"} width={100} height={100} alt={doctor?.name || "unknown"} />
                        <p className="whitespace-nowrap">{ doctor?.name }</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Image src="/assets/icons/calendar.svg" width={20} height={20} alt={doctor?.name || "unknown"} />
                        <p className="whitespace-nowrap">{ formatDateTime(appointment.schedule).dateTime }</p>
                    </div>
                </section>
                <Button className="shad-primary-btn" variant="outline" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New appointment
                    </Link>
                </Button>
                <p className="copyright">© 2025 patient management system</p>
            </div>
        </div>
    )
}
export default Success
