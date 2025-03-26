import { Dispatch, SetStateAction } from "react";

export type setShowWorkSpace = Dispatch<SetStateAction<boolean>>;

export type setGroups = Dispatch<
  SetStateAction<
    {
      name: string;
      id: string;
      userId: string;
      createdAt: Date;
    }[]
  >
>;

export type Group = {
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
};

export type SideBarTopic = {
  active?: boolean;
  data: {
    name: string;
    id: string;
    userId: string;
    createdAt: Date;
  };
};

export type groups = {
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
}[];
