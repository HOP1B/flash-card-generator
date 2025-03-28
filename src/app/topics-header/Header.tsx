"use client";

import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { MessageCircleQuestion } from "lucide-react";
import { Layers } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex w-[50%] justify-between py-5 px-8 mr-[480px]">
      <div className="flex items-center">
        <House size={18} />
        <p className="text-[#1d1d1d] text-sm font-semibold ml-[10px] flex items-center pl-[10px] h-8 border-l-2">
          Title
        </p>
      </div>
      <div className="flex gap-1">
        <Button className="bg-inherit hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold focus:text-[#0353a4] focus:bg-[#98b8d998] shadow-none ">
          <BookOpenCheck /> Summary
        </Button>
        <Link href={"/topics/questions"}>
          <Button className="bg-inherit hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold focus:text-[#0353a4] focus:bg-[#98b8d998] shadow-none ">
            <MessageCircleQuestion /> Questions
          </Button>
        </Link>
        <Link href={"/topics/flashcard"}>
          <Button className="bg-inherit hover:bg-[#98b8d998] text-[#1d1d1d] text-sm font-semibold focus:text-[#0353a4] focus:bg-[#98b8d998] shadow-none ">
            <Layers /> Flashcards
          </Button>
        </Link>
      </div>
    </div>
  );
};
