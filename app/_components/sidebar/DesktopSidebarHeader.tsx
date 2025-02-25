"use client"


import { User } from "@prisma/client"
import NewChatSheet from "./sheets/NewChatSheet"
import NewContactSheet from "./sheets/NewContactSheet"
import { useClerk, UserButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface DesktopSidebarHeaderProps {
    currentUser: User & {
        following: User[]
    }
}

const DesktopSidebarHeader = ({
    currentUser
}: DesktopSidebarHeaderProps) => {
    const {signOut} = useClerk()
    const router = useRouter()
    return (
     <>
     <div className="bg-[#f7f7f7] left-0 overflow-y-auto border-r-[2px] flex justify-between items-center">
        <nav>
            <div className="flex items-center cursor-pointer hover:opacity-75 transition mt-2 ml-2">
                <UserButton />
            </div>
        </nav>
        <nav className="flex justify-between items-center space-x-5 mr-4">
        <StatusSheet />
            <LogOut className="text-[#54656f] cursor-pointer" onClick={() => signOut(() => router.push("/sign-in"))}/>
        </nav>
     </div>
     </>
    )
}

export default DesktopSidebarHeader