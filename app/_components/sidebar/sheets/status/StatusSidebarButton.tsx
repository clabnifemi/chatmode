// app/_components/sidebar/sheets/status/StatusSidebarButton.tsx

import { User } from "@prisma/client";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import StoryViewer from "./StoryViewer";

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
  hasStory,
}: StatusButtonProps) {
  const AvatarTailwind = hasStory
    ? "border-green-400 border-2 rounded-full"
    : "";
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
        <p className="text-muted-foreground text-[0.8125rem] ml-5">
          {statusDescription}
        </p>
      </div>
    </div>
  );
}

interface StatusSidebarButtonProps {
  user: User;
}

const StatusSidebarButton = ({ user }: StatusSidebarButtonProps) => {
  const [showStory, setShowStory] = useState(false);
  const { toast } = useToast();
  const [hasStory, setHasStory] = useState(
    user.statusImageUrl !== null ? true : false
  );

  useEffect(() => {
    setHasStory(user.statusImageUrl !== null ? true : false);
  }, [user.statusImageUrl, hasStory]);

  const toggleShowStory = () => {
    setShowStory(!showStory);
  };
  const handleDeleteStory = () => {
    axios
      .delete("/api/status")
      .then(() => {
        // Update local state after successful deletion
        setHasStory(false);
        user.statusImageUrl = null;
        toast({
          title: "Status deleted successfully",
          className: "bg-green-500",
          duration: 2000,
        });
        toggleShowStory();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error deleting status",
          description: "Please try again",
          className: "bg-red-500",
          duration: 2000,
        });
      });
  };

  return (
    <div>
      <input disabled />
      {hasStory ? (
        <div>
          <button
            onClick={toggleShowStory}
            className="text-[#54656f] cursor-pointer hover:opacity-75 transition mt-2 ml-2"
          >
            <StatusButton
              user={user}
              statusTitle="My Status"
              statusDescription="today"
              hasStory={hasStory}
            />
          </button>
          {showStory && (
            <StoryViewer
              user={user}
              onClose={() => toggleShowStory()}
              onDeleteStory={() => handleDeleteStory()}
            />
          )}
        </div>
      ) : (
        <UploadButton
          content={{
            button({ ready }) {
              const statusTitle = ready ? "My Status" : "Loading...";
              const statusDescription = ready
                ? "Add to my status"
                : "Wait a moment";
              return (
                <StatusButton
                  statusTitle={statusTitle}
                  statusDescription={statusDescription}
                  user={user}
                  hasStory={hasStory}
                />
              );
            },
          }}
          endpoint="statusImage"
          appearance={{
            allowedContent: { display: "none" },
            button: {
              border: "none",
              background: "#fff",
              cursor: "pointer",
              height: "100%",
              width: "100%",
              justifyContent: "start",
            },
          }}
          onUploadError={(err: Error) => {
            console.log(err);
          }}
          onUploadBegin={() => {
            toast({
              title: "Uploading story",
              description: "wait a minute...",
              duration: 30000,
            });
          }}
          onClientUploadComplete={(res) => {
            axios
              .post("/api/status", { statusImageUrl: res[0].url })
              .then((res) => {
                user.statusImageUrl = res.data.statusImageUrl;
                toast({
                  title: "Upload complete!",
                  className: "bg-green-500",
                  duration: 2000,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      )}
      <Toaster />
    </div>
  );
};

export default StatusSidebarButton;
