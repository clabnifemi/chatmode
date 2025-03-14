"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/conversations");
  }, []);

  return (
    <div>
      <SignIn />
    </div>
  );
}
