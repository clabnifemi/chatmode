import { FullMessageType } from "@/app/_types";
import { useClerk } from "@clerk/nextjs";
import clsx from "clsx";
import { Divide } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { format } from "date-fns";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox = ({
    data,
    isLast
}: MessageBoxProps) => {
    const { user } = useClerk()
    const isOwn = user?.phoneNumbers?.[0]?.phoneNumber === data.sender?.phoneNumber

const seenList = (data.seen || [])
.filter((user) => user.phoneNumber !== data.sender?.phoneNumber)
.join(', ')


const SeenInfo = useMemo(() => {
    return seenList.length > 0 ? '/image/Seen.svg' : 'image/sent.svg';
}, [seenList])




    return (
       <div className={clsx('flex mb-[12px]', isOwn && 'justify-end items-start')}>
        {isOwn && 
        <div className="ml-16 flex items-start">
            <img 
            src="/image/MessageBubbleTriangle.svg"
            className="transform scale-x-[-1] items-start"
            />
    

        </div>
        } 
        <div className={clsx('flex flex-col', isOwn && 'items-end')}>
            <div className={clsx('text-sm w-fit overflow-hidden', isOwn ? 'bg-[#d1f4cc] text-black' : 'bg-gray-100', data.image ? 'rounded [3px]' : 'rounded-[7px] py-2 px-3 shadow-lg shadow-gray-300 shadow-botton')}>
            {data.image ? (
                <Image
                alt="Image"
                height="288"
                width="288"
                src={data.image}
                />
            ): (
                <div className="flex flex-col relative max-w-[600px]">
                    <p className="mb-2 break-words mr-20">{data.body}</p>

                    <div className="absolute bottom-0 right-0 flex items-end">
                        <div className="text-[11px] h-[15px] text-gray-500">
                         {format(new Date(data.
                            createdAt), 'p')}
                        </div>
                          {isOwn && 
                          <img src={SeenInfo} 
                          className="mr-[2px] ml-[2px] w-[16px] h-[11px]"
                          />}
                    </div>
                </div>
            )}
            </div>

        </div>
    

       </div>
    )
}

export default MessageBox  