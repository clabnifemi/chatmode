import { useConversation } from "@/app/_hooks/useConversation";
import { FullMessageType } from "@/app/_types";
import axios from "axios";
import { useEffect, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[];
  isInCall: boolean;
}

const Body = ({ initialMessages, isInCall }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();

  // Uncomment when you want to track seen messages
  // useEffect(() => {
  //   if (conversationId) {
  //     axios.post(`/api/conversations/${conversationId}/seen`);
  //   }
  // }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto bg-blue-100">
      {!isInCall && (
        <div className="pt-24"> 
          {messages.map((message, i) =>
            <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
