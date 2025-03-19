'use client';
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Header } from "./components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);
  return (
    <div className="w-screen flex flex-col items-center justify-center py-8">
      <Header />
      <p className="text-4xl font-bold py-14 text-center ">
        <span className="text-[#0353a4]">Instantly</span> create notes,
        flashcards and <br /> quizzes from your study material.
      </p>
      <p className="text-[#4a4a4a] font-medium text-sm mb-4 ">
        See how you can save <span className="font-semibold">4+ hours</span> on
        your next study session below.
      </p>
      <div className="bg-black text-white text-base py-4 px-6 rounded-lg hover:cursor-pointer hover:bg-[#023e7d] hover:ease-">
        <SignInButton>
          <div className="flex items-center gap-1 ">
            Get Started - It&apos;s Free <ArrowRight size={16} />
          </div>
        </SignInButton>
      </div>
    </div>
  );
}
