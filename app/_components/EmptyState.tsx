"use Client";

import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import NewChatSheet from "./sidebar/sheets/NewChatSheet";

interface EmptyStateProps {
  currentUser: User & {
    following: User[];
  };
}

const EmptyState = ({ currentUser }: EmptyStateProps) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full">
        <img src="/images/Communities.svg" className="w-1/2 mt-36" />
        <h2 className="text-3xl m-12 mt-4 mb-4 text-muted-foreground">
          ChatMode
        </h2>
        <Separator />
        <h3 className="text-muted-foreground text-xl font-semibold text-gray-900 mb-3">
          Select a chat to start conversation
        </h3>
        <NewChatSheet currentUser={currentUser} />
      </div>
    </div>
  );
};

export default EmptyState;
