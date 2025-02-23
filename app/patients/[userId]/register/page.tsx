
import { RegisterForm } from "@/components/forms/RegisterForm"
import { getPatient, getUser } from "@/lib/actions/patient.actions"
import Image from "next/image"
import { redirect } from "next/navigation"

import * as React from 'react'

export const Registeration = async ({ params }: SearchParamProps) => {
  const { userId } = await params
  console.log(userId)
  const user = await getUser(userId)
  const patient = await getPatient(userId);
  if (patient) redirect(`/patients/${userId}/new-appointment`);
    return (
        <div className="flex h-screen max-h-screen">
      <section  className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} className="mb-12  h-10" alt="logo w-fit" />
            <RegisterForm user={ user} />
          <div className="text-14- mt-20 flex justify-between">
            <p className="copyright p-12 ">© 2025 patient management system</p>
          </div>
        </div>
      </section>
      <Image src="/assets/images/register-img.png" width={1000} height={1000} alt="patient" className="side-img max-w-[390px]"/>
    </div>
    )
}
export default Registeration
