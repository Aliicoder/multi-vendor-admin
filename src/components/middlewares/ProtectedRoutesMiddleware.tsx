import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const { accessToken, roles } = useSelector(selectCurrentUser);
  console.log("accessToken : ", accessToken);
  const { pathname } = useLocation();
  if (accessToken && roles.includes("admin")) return <Outlet />;
  else return <Navigate to={"/login"} state={{ from: pathname }} />;
}

export default ProtectedRoutes;
