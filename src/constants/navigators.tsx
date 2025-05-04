import { VscDashboard } from "react-icons/vsc"
import { RiChatSettingsLine } from "react-icons/ri"
import { IoPeopleOutline } from "react-icons/io5"
import { RiUserSettingsLine } from "react-icons/ri"
import { MdOutlineNotificationsActive, MdSecurity } from "react-icons/md"
import { IoPersonOutline } from "react-icons/io5"
import { GoVerified } from "react-icons/go"
import { ReactNode } from "react"
import { TbCategory } from "react-icons/tb"
import { VscGitStashApply } from "react-icons/vsc"
export interface ISubNavigator {
  title: string
  link: string
  segment: string
}
export interface IMainNavigators {
  title: string
  icon: ReactNode
  link: string
  segment: string
  subNavigators?: ISubNavigator[]
}
export const mainNavigators: IMainNavigators[] = [
  {
    title: "Dashboard",
    segment: "dashboard",
    icon: <VscDashboard />,
    link: "/",
  },
  {
    title: "Sellers",
    segment: "sellers",
    icon: <IoPeopleOutline />,
    link: "/sellers",
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
]

export interface ISellerProfileNavigator {
  id: number
  title: string
  icon: JSX.Element
  link: string
}
export const sellerProfileNavigators = [
  {
    id: 1,
    title: "Profile Settings",
    icon: <IoPersonOutline className="c2 h-full w-full" />,
    link: "details",
  },
  {
    id: 2,
    title: "Password",
    icon: <MdSecurity className="c2 h-full w-full" />,
    link: "password",
  },
  {
    id: 3,
    title: "Notifications",
    icon: <MdOutlineNotificationsActive className="c2 h-full w-full" />,
    link: "notifications",
  },
  {
    id: 4,
    title: "Verification",
    icon: <GoVerified className="c2 h-full w-full" />,
    link: "verification",
  },
]
