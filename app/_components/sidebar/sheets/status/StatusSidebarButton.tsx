
import { User } from "@prisma/client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";


interface StatusButtonProps {
    user: User;
    statusTitle?: string;
    statusDescription?: string;
    hasStory?: boolean;
}

function StatusButton({
    user,
    statusTitle,
    statusDescription,
    hasStory  
}: StatusButtonProps) {
    const AvatarTailwind = hasStory ? "border-green-400 border-2 rounded-full" : "";
 return (
        <div className="flex relative w-full pt-5 pl-4">
        <Avatar className={AvatarTailwind}>
            <AvatarImage src={user.profileImageUrl || undefined} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        {!hasStory && ( // change true to variable
                <span
                    className="
                    absolute
                    flex
                    rounded-full
                    bg-[#00a884]
                    top-11
                    left-12
                    ring-2
                    ring-white
                    h-[14px]
                    w-[14px]
                    items-center
                    justify-center
                    "
                >
                    <Plus className="text-white" />

                </span>
            )}

                <div className="text-left w-full">
                <h4 className="text-[1rem] text-black ml-5">{statusTitle}</h4>
                <p className="text-muted-foreground text-[0.8125rem] ml-5">{statusDescription}</p>
            </div>

    </div>
 )
}





interface StatusSidebarButtonProps {
    user: User
}
 
const StatusSidebarButton = ({ 
    user 
}: StatusSidebarButtonProps) => {
    const [showStory, setShowStory] = useState(false);
    const {toast} = useToast();
    const [hasStory, setHasStory] = useState(user.statusImageUrl !== null ? true : false);
    useEffect(() => {
        setHasStory(user.statusImageUrl !== null ? true : false)
    }, [user.statusImageUrl, hasStory])

      const toggleShowStory = () => {
        setShowStory(!showStory);
      }
      const handleDeleteStory =() => {
        toggleShowStory();
        user.statusImageUrl = null;
        axios.delete('/api/status')
        .then(() => {})
        .catch(err => {
            console.log(err);
        })
      }

    return (
        <div>
            {hasStory ? (
                            <div>
                            <button onClick={toggleShowStory} className="text-[#54656f] cursor-pointer hover:opacity-75 transition mt-2 ml-2">
                            <StatusButton
                            user={user}
                            statusTitle="My Status"
                            statusDescription="today"
                            hasStory={hasStory}
                        />
                                </button>
                                {showStory && (
                                    <div>THIS IS STORY VIWER</div>
                                )

                                }
                            </div>
             ) : (
               

            <Toaster />
        </div>
    )

}

export default StatusSidebarButton