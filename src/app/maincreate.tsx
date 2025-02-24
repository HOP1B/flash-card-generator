import { BookOpen } from "lucide-react";
import Link from "next/link";

export const Maincreater = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Link href={"/create"} className="cursor-pointer">
        <div className="py-5 px-4 bg-[#caf0f8] w-[300px] h-[236px] flex items-center justify-center flex-col border rounded-xl border-[#0E6BA8] hover:bg-[#ade8f4] duration-500">
          <div className="border rounded-full w-[56px] border-[#0E6BA8] h-[56px] flex items-center justify-center">
            <BookOpen style={{ color: "#0E6BA8" }} />
          </div>
          <div className="pt-6 flex items-center justify-center flex-col">
            <h3 className="font-bold mb-2">Start a lesson</h3>
            <p>learn something new!</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
