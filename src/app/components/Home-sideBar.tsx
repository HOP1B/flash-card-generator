"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Compass } from "lucide-react";
import { ChevronDown } from "lucide-react";
// import { SideBarList } from "./SideBarList";
import { Profile } from "./Profile";
import Link from "next/link";
// import { WorkSpaceTab } from "./workspace-tab/WorkspaceTab";
// import { useState } from "react";
// import { Group } from "@prisma/client";

export const SideBar = () => {
  // const [showWorkSpace, setShowWorkSpace] = useState<boolean>(false);
  // const [groups, setGroups] = useState<Group[]>([]);

  return (
    <div className="max-w-80 h-[100dvh] bg-[#f8f8f8] p-6 font-inter absolute ">
      <div className="h-[90px] p-5 "></div>
      <div className="flex">
        <Link href={"/create"}>
          <Button className=" bg-[#0353a4] text-base font-semibold w-[234px] py-[10px] px-3 rounded-r-none hover:bg-[#023e7d] ">
            <Plus /> New Lesson
          </Button>
        </Link>

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
        <div className=" text-[#777777] pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
          Workspaces
          <Button
            // onClick={() => setShowWorkSpace(true)}
            className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
          >
            <Plus className="text-[#777777]" />
          </Button>
        </div>
        <div>
          {/* {showWorkSpace && (
            <WorkSpaceTab setShowWorkSpace={setShowWorkSpace} setGroups={setGroups} />
          )} */}
        </div>

        <ul>
          {/* {groups.map((data) => (
            <SideBarList key={data.id} data={data} />
          ))} */}
        </ul>
      </div>
      <Profile />
    </div>
  );
};
