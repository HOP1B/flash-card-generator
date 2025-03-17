"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex w-[80%] justify-between">
      <div className="flex items-center gap-2">
        <Image src="/mlogo.png" width={50} height={50} alt="" />
        <p className="font-extrabold text-2xl ">FlashcardM</p>
      </div>

      <div className="flex gap-4">
        <div className="h-10 bg-[#0353a4] hover:bg-[#023e7d] text-base font-medium rounded-lg py-2 px-4 text-white">
          <SignUpButton />
        </div>
        <div className="h-10 font-medium rounded-lg py-2 px-4 border border-black">
          <SignInButton />
        </div>
      </div>
    </div>
  );
};
