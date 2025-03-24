import { SideBarTopic } from "../../../types/sideBarGroup";


export const  SideBarList = ({data}: SideBarTopic) => {
    return (
      <li>
        <div className=" h-10 flex items-center p-2 text-[#1d1d1d] text-sm font-semibold bg-[#98b8d998] rounded-md ">
          {data.name}
        </div>
      </li>
    );
}