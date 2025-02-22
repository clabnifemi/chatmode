"use client";

import { useState } from "react";
// Use a type-only import to avoid conflicts with your React component name
import { Conversation, User } from "@prisma/client";
import { FullMessageType } from "@/app/_types";
import Header from "./Header";
import Body from "./Body";
import Form from "./Form";

// Make sure these imports point to the correct file paths for your components


interface ConversationProps {
    conversation: Conversation & {
        users: User[]
    },
    currentUserPrisma: User,
    messages: FullMessageType[]
}

const Conversation =({
    conversation,
    currentUserPrisma,
    messages
}: ConversationProps) => {
    const [isInCall, setIsInCall] = useState(false)

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex flex-col">
        <Header 
        conversation={conversation}
        isInCall={isInCall}
        currentUserPrisma={currentUserPrisma}
        setIsInCall={setIsInCall}
       
        />
        <Body
                    initialMessages={messages}
                    isInCall={isInCall}
                />
                {!isInCall &&
                    (!conversation.isChannel
                        || conversation.ownerId === currentUserPrisma.id) &&
                    <Form />}
      </div>
    </div>
  );
};

export default Conversation;
