"use client"
import { FullConversationType } from "@/app/_types";
import { useClerk } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface ConversationListProps {
    conversations: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversations
}) => {
    const [items,setItems] = useState(conversations)
    const [searchText, setSearchText] = useState("")
    const router = useRouter()
    const {user} = useClerk()





    return (
        <aside className="h-[550px] overflow-y-auto">
            <div>
                <div className="space-y-auto">
                   <div className="flex bg-gray w-11/12 m-auto rounded-xl mt-2 ml-3">
                       <Search className="ml-3"/>
                   </div>
                </div>
            </div>
        </aside>
    );
}
export default ConversationList