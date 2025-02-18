import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import { Trash2 } from "lucide-react";


interface UserBoxProps {
    data: User,
    handleRemoveContact: (newContacts: User[]) => void
}

const UserBox: React.FC<UserBoxProps> = ({
    data,
    handleRemoveContact
}) => {

    const handleContactClick = () => {
        return
    }

    const handleRemoveClick = () => {
        return
    }
    return (
        <>
        <Separator/>
        <div 
        onClick={handleContactClick}
        className="
        w-full
        relative
        flex items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        ">
            <div className="flex w-full items-center">
                <Avatar className="w-12 h-12">
                    <AvatarImage src=""/>
                    <AvatarFallback>
                        CN
                    </AvatarFallback>
                </Avatar>

             <div className="ml-4 text-left space-y-1 relative">
                <h4 className="text-[1rem] absolute bottom-0">
                    {data.username}
                </h4>
                <h4 className="text-[0.75rem] absolute top-0">
                    {data.about}
                </h4>
               </div>
               <div className="group w-full flex justify-end">
                    <Button className="bg-inherit hover:bg-inherit p-0"
                    onClick={handleRemoveClick}>
                        <Trash2 className="invisible group-hover:visible text-red-300 w-5 h-5"/>
                    </Button>
               </div>
            </div>
        </div>
        </>
    );
}


export default UserBox;