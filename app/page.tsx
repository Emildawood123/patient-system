import { PatientForm } from "@/components/forms/PatientForm"
import OTP from "@/components/passKeyModel"
import Image from "next/image"
import Link from "next/link"
export default async function Home({ searchParams }: SearchParamProps) {
  const isAdmin = await searchParams.admin === 'true'
  return ( 
    <div className="flex h-screen max-h-screen">
      {isAdmin && <OTP />}
      <section className="container remove-scrollbar ">
        
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} className="mb-12  h-10" alt="logo w-fit" />
          <PatientForm />
          <Link href="?admin=true" className="text-green-500 text-right mt-3">Admin</Link>
          <div className="text-14- mt-20 flex justify-between">
            
            <p className="justify-items-end xl:text-left  text-dark-600">© 2025 patient management system</p>
          </div>
          
          
        </div>
      </section>
      <Image src="/assets/images/onboarding-img.png" width={1000} height={1000} alt="patient" className="w-[50%]"/>
    </div>
  )
}
