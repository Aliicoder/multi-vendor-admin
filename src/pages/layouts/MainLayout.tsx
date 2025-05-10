import Sidebar from "@/components/layouts/SideBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div id="bg-fullscreen-layout" className=" bg-slate-50">
      <div className="container mx-auto relative h-dvh flex flex-row">
        <Sidebar />
        <div className="size-full flex flex-col justify-between overflow-y-scroll hide-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
