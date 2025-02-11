"use client"
import { SignIn, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
      <UserButton />
      This is a user page
    </div>
  );
}