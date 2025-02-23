import { Button } from "./ui/button"
import Image from "next/image"
interface SubmitButtonProps {
    isLoading: boolean
    className?: string
    children: React.ReactNode
}
export const SubmitButton = ({ isLoading, className, children }: SubmitButtonProps) => {
    return (
        <Button type="submit" className={className} disabled={isLoading ?? "shad-primary-btn w-full"} >
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/icons/loader.svg"
                        width={24}
                        height={24}
                        alt=""
                        className="animate-spin"
                    />
                    Loading ...
                </div>
            ): children}
        </Button>
    )
}
