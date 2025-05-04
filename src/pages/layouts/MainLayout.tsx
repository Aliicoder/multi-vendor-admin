import { Outlet } from "react-router-dom"

import Sidebar from "@/components/layouts/SideBar"

function MainLayout() {
  return (
    <div
      className={`relative transition-all bg-[var(--main-color)] text-[--text-color] bg-slate-50 `}
    >
      <div className={`container mx-auto relative h-[100vh] flex flex-row`}>
        <Sidebar />
        <div
          className={`relative  w-full h-full flex flex-col justify-between bg-slate-50 overflow-y-scroll hide-scrollbar`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
