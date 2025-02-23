'use client'
import {
  AlertDialog,
  AlertDialogAction,

  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { decryptKey, encryptKey } from "@/lib/utils"


const OTP = () => {
    const router = useRouter()
    const [open, setOpen] = useState(true)
    const path = usePathname()
    const [passKey, setPassKey] = useState("")
  const [error, setError] = useState("")
    const closeModel = () => {
        setOpen(false)
        router.push('/')
  }
  const encryptedKey = typeof window !== 'undefined' ? localStorage.getItem("access") : null
  useEffect(() => {
    if (path) {
      const accessKey = encryptedKey ? decryptKey(encryptedKey) : passKey
      if (accessKey) {
        verifyAdmin()
      }
      if (accessKey === "123456") {
      setOpen(false)
      router.push("/admin")
    } else {
      setOpen(true)
    }
    }
    
  }, [encryptedKey])
  const verifyAdmin = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
    e?.preventDefault()
    if (passKey === "123456") {
      const encryptedKey = encryptKey(passKey)
      localStorage.setItem("access", encryptedKey)
    } else {
      setError("Invalid passKey, please try again")
    }
  }
    return (
        <AlertDialog open={ open } onOpenChange={setOpen}>
  <AlertDialogContent className="bg-dark-400 border-none">
    <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between">Verfiy OTP <Image src="/assets/icons/close.svg" width={20} height={20} className="opacity-35 cursor-pointer" alt="" onClick={() => closeModel()} />
            </AlertDialogTitle>
            <AlertDialogDescription >
                Please enter OTP sent your mobile phone registerd
            </AlertDialogDescription>
          </AlertDialogHeader>
                      <div className="flex flex-col">
          <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)} >

            <InputOTPGroup className="shad-otp">
              {Array.from(Array(6).keys()).map((n) => {
                return (
                  <InputOTPSlot key={ n } index={n} className="shad-otp-slot"/>
                )
              })}
              
                
            </InputOTPGroup>
            
              
            </InputOTP>
            {error && (
                <p className="shad-error flex items-center mt-4">{ error }</p>
              )}
            </div>
    <AlertDialogFooter>
      <AlertDialogAction  className="shad-primary-btn w-full" onClick={(e) => verifyAdmin(e)}>Verifiy</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

)
}
export default OTP
