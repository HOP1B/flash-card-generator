import Link from "next/link";
import { SideBarTopic } from "../../../types/sideBarGroup";

export const SideBarList = ({ data, active }: SideBarTopic) => {
 

  return (
    <li >
      <Link
        href={`/groups/${data.id}`}
        data-active={active}
        className=" h-10 flex items-center p-2 mb-1 text-[#1d1d1d] text-sm font-semibold hover:bg-[#98b8d998] rounded-md data-[active=true]:bg-[#98b8d998]"
      >
        {data.name}
      </Link>
    </li>
  );
};
