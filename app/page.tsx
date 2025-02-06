import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-red-500 bg-blue-700 font-bold h-full w-full">
      <Button variant={"destructive"}>click me</Button>
      This is the user interface.
    </div>
  )
}
