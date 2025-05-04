import { useRefreshMutation } from "@/store/Reducers/authApiSlice";
import { selectCurrentUser, setCredentials } from "@/store/Reducers/authReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const usePersistLogin = () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { accessToken } = useSelector(selectCurrentUser)
  const [refreshMutation] = useRefreshMutation();
  const [isLoading,setIsLoading] = useState(true)
  const { state } = useLocation()
  const directedFrom = state?.directed?.from || "/" ; 
  useEffect(()=>{
    const persistLogin = async () =>{
      try {
        if(!accessToken) {
          const response = await refreshMutation({}).unwrap(); //console.log("Refreshing >>", response)
          dispatch(setCredentials(response.user))
          if(state?.directed)
            navigate(directedFrom)
        }
      }catch(error){ //console.log(" refreshing error >>",error) 
        toast.error("please login first")
        navigate("/login",{})
      }finally{
        setIsLoading(false)
      }
    }
    persistLogin()
  },[])
  return { isLoading }
}
export default usePersistLogin