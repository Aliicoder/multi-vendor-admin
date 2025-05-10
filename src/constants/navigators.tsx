import { VscDashboard } from "react-icons/vsc";
import { RiChatSettingsLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { ReactNode } from "react";
import { TbCategory } from "react-icons/tb";
import { VscGitStashApply } from "react-icons/vsc";
export interface ISubNavigator {
  title: string;
  link: string;
  segment: string;
}
export interface IMainNavigators {
  title: string;
  icon: ReactNode;
  link: string;
  segment: string;
  subNavigators?: ISubNavigator[];
}
export const mainNavigators: IMainNavigators[] = [
  {
    title: "Dashboard",
    segment: "dashboard",
    icon: <VscDashboard />,
    link: "/",
  },
  {
    title: "Merchants",
    segment: "merchants",
    icon: <IoPeopleOutline />,
    link: "/merchants",
  },
  {
    title: "Applicants",
    segment: "applicants",
    icon: <VscGitStashApply />,
    link: "/applicants",
  },
  {
    title: "Categories",
    segment: "categories",
    icon: <TbCategory />,
    link: "/categories",
  },
  {
    title: "Sellers Chats",
    segment: "sellersChats",
    icon: <RiChatSettingsLine />,
    link: "/Chats",
  },
  {
    title: "Profile",
    segment: "profile",
    icon: <RiUserSettingsLine />,
    link: "/profile",
  },
];
