import { selectCurrentUser } from '@/store/Reducers/authReducer'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from "react-router-dom"

function ProtectedRoutes() {
  const user = useSelector(selectCurrentUser) ; console.log("<ProtectedRoutes> user >>", user)
  const {pathname} = useLocation()
  if(user.accessToken != "") 
    return <Outlet/>
  else
    return <Navigate to={"/"} state={{from:pathname,directed:true}}/>
}

export default ProtectedRoutes