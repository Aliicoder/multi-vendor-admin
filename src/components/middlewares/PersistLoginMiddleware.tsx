import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRefreshMutation } from "@/store/apiSlices/authSlice"
import { selectCurrentUser, setCredentials } from "@/store/Reducers/authReducer"
import Loader from "../portals/Loader"

function PersistLoginMiddleware() {
  const user = useSelector(selectCurrentUser)
  const [refreshMutation] = useRefreshMutation()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const refreshUser = async () => {
    try {
      let response = await refreshMutation({}).unwrap()
      dispatch(setCredentials(response.user))
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (!user?.accessToken) {
      refreshUser()
    } else {
      setIsLoading(false)
    }
  }, [])
  return (
    <>
      <Loader isLoading={isLoading} />
      {isLoading ? null : <Outlet />}
    </>
  )
}

export default PersistLoginMiddleware
