"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Compass } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { SideBarList } from "../click/SideBarList";
import { useState } from "react";
import { X } from "lucide-react";
import { Profile } from "./Profile";

export const SideBar = () => {
  const [showWorkSpace, setShowWorkSpace] = useState(false);

  return (
    <div className="max-w-80 h-[100dvh] bg-[#f8f8f8] p-6 font-inter relative ">
      <div className="h-[90px] p-5 "></div>
      <div className="flex">
        <Button className=" bg-[#0353a4] text-base font-semibold w-[234px] py-[10px] px-3 rounded-r-none hover:bg-[#023e7d] ">
          <Plus /> New Lesson{" "}
        </Button>
        <Button className="bg-[#023e7d] rounded-l-none w-9 hover:bg-[#023e7d] ">
          <ChevronDown />
        </Button>
      </div>

      <div className="p-1 py-7">
        <div className="flex text-[#1d1d1d] text-sm font-semibold items-center gap-1 ">
          <Compass size={16} /> Explore Courses
        </div>
      </div>
      <div>
        {!showWorkSpace && (
          <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
            Workspaces
            <Button
              onClick={() => setShowWorkSpace(true)}
              className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
            >
              <Plus className="text-[#777777]" />
            </Button>
          </div>
        )}
        {showWorkSpace && (
          <div>
            <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
              Workspaces
              <Button
                onClick={() => setShowWorkSpace(false)}
                className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
              >
                <Plus className="text-[#777777]" />
              </Button>
            </div>
            <div className="w-[640px] p-[30px] z-30 absolute left-[600px] bg-white rounded-xl ">
              <h1 className="text-[#1d1d1d] font-inter text-xl font-bold mb-6 flex items-center justify-between">
                New Workspace
                <Button
                  className="bg-inherit hover:bg-[#dcdcdc] p-2 shadow-none text-[#5e5e5e] "
                  onClick={() => setShowWorkSpace(false)}
                >
                  <X size={30} />
                </Button>
              </h1>
              <form>
                <p className="font-inter text-[#616161] text-base font-semibold mb-6 ">
                  Enter the name of your new Workspace
                </p>
                <label>
                  <input
                    type="text"
                    placeholder="Enter name here"
                    className="w-[578px] placeholder:text-[#e5e7eb] border border-[#e5e7eb]  text-base font-inter font-semibold py-3 px-2 rounded-xl mb-8"
                  />
                </label>
                <div className="flex justify-between ">
                  <Button
                    className="w-[283px] bg-inherit hover:bg-[#dcdcdc] text-[#1d1d1d] border border-[#1d1d1d] py-3 px-4 shadow-none text-base font-inter font-semibold "
                    onClick={() => setShowWorkSpace(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="w-[283px] bg-[#6f47eb] hover:bg-[#5f3cca] text-white py-3 px-4 shadow-none text-base font-inter font-semibold ">
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ul>
          <SideBarList />
        </ul>
      </div>
      <Profile />
    </div>
  );
};
