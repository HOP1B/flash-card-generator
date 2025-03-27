"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SideBarList } from "./SideBarList";
import { Profile } from "./Profile";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Group } from "../../../types/sideBarGroup";
import { WorkSpaceTab } from "./workspace-tab/WorkspaceTab";

export const SideBar = () => {
  const { session } = useSession();
  const [showWorkSpace, setShowWorkSpace] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (session?.user.id) {
      axios.get(`/api/group?userId=${session?.user.id}`).then((res) => {
        setGroups(res.data);
      });
    }
  }, [session]);

  return (
    <div className="max-w-80 h-[100dvh] bg-[#f8f8f8] p-6 font-inter absolute ">
      <div className="h-[90px] p-5 "></div>
      <div className="w-full">
        <Link href={`/groups/${id}/create`}>
          <Button className=" bg-[#0353a4] text-base font-semibold py-[10px] px-3 w-full hover:bg-[#023e7d] ">
            <Plus /> New Lesson
          </Button>
        </Link>
      </div>

      <div>
        <div className=" text-[#777777] mt-8 pb-2 px-1 flex justify-between items-center text-sm font-semibold ">
          Workspaces
          <Button
            onClick={() => {
              setShowWorkSpace(true);
            }}
            className="bg-inherit shadow-none hover:bg-[#E8E8E8] "
          >
            <Plus className="text-[#777777]" />
          </Button>
        </div>
        <div>
          {showWorkSpace && (
            <WorkSpaceTab
              setShowWorkSpace={setShowWorkSpace}
              setGroups={setGroups}
              groups={groups}
            />
          )}
        </div>

        <ul>
          {groups.map((data) => (
            <SideBarList active={data.id === id} key={data.id} data={data} />
          ))}
        </ul>
      </div>
      <Profile />
    </div>
  );
};
