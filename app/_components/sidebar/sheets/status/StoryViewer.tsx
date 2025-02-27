import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { ArrowLeft, Trash2, X } from "lucide-react";

interface StoryViewerProps {
    user: User;
    onClose: () => void;
    onDeleteStory: () => void;
}

const StoryViewer = ({
    user,
    onClose,
    onDeleteStory
}: StoryViewerProps) => {
    return (
             <>
             {/* Top bar */}
              <div>
                <div>
                    <div>
                        <Avatar>
                            <AvatarImage src={user.profileImageUrl || undefined} />
                            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{user.username}</p>
                            <p>today</p>
                        </div>
                    </div>
                </div>
                <Trash2 onClick={onDeleteStory}/>
                <ArrowLeft />
                <X />
              </div>
               {/* Story Image */}
              <div>
                <img src={user.statusImageUrl || undefined} alt="Story" />
              </div>
            </>
    )
}



export default StoryViewer;