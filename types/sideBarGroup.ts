import { Dispatch, SetStateAction } from "react";

export type WorkspaceTab = {
  setShowWorkSpace: Dispatch<SetStateAction<boolean>>;
};

export type SetGroups = {
  setGroups: Dispatch<
    SetStateAction<
      {
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
      }[]
    >
  >;
};

export type Group = {
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
};

export type SideBarTopic = {
  data: {
    name: string;
    id: string;
    userId: string;
    createdAt: Date;
  }
};