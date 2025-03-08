import { User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}
const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A Group Chat</DialogTitle>
            <DialogDescription>
              Create a chat with two or more people
            </DialogDescription>
            <div onClick={() => onClose()}>
              <X />
              <span>Close</span>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupChatModal;
