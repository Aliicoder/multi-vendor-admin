import {
  IMainNavigators,
  ISubNavigator,
  mainNavigators,
} from "@/constants/navigators";
import { Link, useLocation } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { useLogoutMutation } from "@/store/apiSlices/authSlice";
import { getInitials } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";

function Sidebar() {
  const user = useSelector(selectCurrentUser);
  const [logoutMutation] = useLogoutMutation();
  const pathname = useLocation().pathname;

  return (
    <div className="pr-5 py-10 w-fit flex flex-col justify-between overflow-hidden bg-white ">
      <div />

      <div
        id="sidebar-bg"
        className="right-full top-0 absolute w-[100vw] h-full bg-white "
      />

      <ul>
        {mainNavigators.map((navigator: IMainNavigators) => {
          let selected =
            pathname === navigator.link ||
            (navigator.link.length > 1 && pathname.startsWith(navigator.link));
          return (
            <li
              className={`${
                selected ? "text-blue-500 bg-slate-50 rounded-lg" : ""
              } relative`}
              key={navigator.title}
            >
              <Link
                className={`my-3 p-3 gap-3  mx-5 | transition-all flex montserrat items-center   `}
                to={navigator.link}
              >
                <p className="c4">{navigator.icon} </p>
                <h3 className={` c3 font-medium text-nowrap`}>
                  {navigator.title}
                </h3>
              </Link>
              {navigator.subNavigators &&
                navigator.subNavigators.length > 0 && (
                  <div
                    className={` ${
                      selected ? "flex flex-col" : "hidden"
                    } text-black`}
                  >
                    {navigator.subNavigators.map(
                      (subNavigator: ISubNavigator) => (
                        <Link
                          key={subNavigator.title}
                          className="transition-all flex montserrat items-center gap-3  mx-5  p-[3%]"
                          to={subNavigator.link}
                        >
                          <p className="c4 opacity-0">{navigator.icon} </p>
                          <h1 className={`${selected ? "font-semibold" : ""}`}>
                            {subNavigator.title}
                          </h1>
                        </Link>
                      )
                    )}
                  </div>
                )}
            </li>
          );
        })}
      </ul>
      <div className="flex w-fit rounded-lg drop-shadow-sm bg-white border border-neutral-100 ">
        <button
          onClick={logoutMutation}
          className="px-3 flex montserrat items-center border-r "
        >
          <TbLogout2 className="text-red-500" />
        </button>
        <div className="  p-3 gap-5 flex items-center  ">
          <div
            id="avatar"
            className="size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                            bg-blue-500 text-white"
          >
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col font-medium ">
            <h1 className="text-fs-13 w-[15ch] truncate ">{user?.name}</h1>
            <h1 className="text-fs-10 min-w-[20ch] max-w-fit truncate">
              {user?.email}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
