import { AppointmentForm } from "@/components/forms/AppointmentForm"
import { getPatient } from "@/lib/actions/patient.actions"
import Image from "next/image"
const newAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId)
  console.log(userId, patient)
    return (<div className="flex h-screen max-h-screen">
          <section  className="container remove-scrollbar my-auto">
            <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} className="mb-12  h-10" alt="logo w-fit" />
                <AppointmentForm userId={userId} type="create" patientId={ patient.$id } />
              <div className="text-14- mt-20 flex justify-between">
                <p className="copyright p-12 ">© 2025 patient management system</p>
              </div>
            </div>
          </section>
          <Image src="/assets/images/appointment-img.png" width={1000} height={1000} alt="patient" className="side-img max-w-[390px] bg-bottom"/>
        </div>)
}
export default newAppointment
