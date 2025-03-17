"use client";
import { Avatar } from "@/components/ui/avatar";
import { SignOutButton, useSession } from "@clerk/nextjs";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";

export const Profile = () => {
  const { session } = useSession();
  return (
    <div className="flex items-center border border-solid border-[#E8E8E8] gap-1 rounded-xl bg-white px-2 py-3 sticky z-10 top-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src={session?.user.imageUrl} />
        <AvatarFallback>{session?.user.fullName![0]} </AvatarFallback>
      </Avatar>
      <div className="mr-14">
        <div className=" text-[#1d1d1d] text-sm font-semibold">
          {session?.user.fullName}
        </div>
        <div className="text-[#777777] font-semibold text-xs">
          {session?.user?.primaryEmailAddress?.emailAddress}
        </div>
      </div>

      <SignOutButton>
        <LogOut size={20} className="ml-10 hover:cursor-pointer" />
      </SignOutButton>
    </div>
  );
};
