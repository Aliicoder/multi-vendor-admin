import { RootState } from "@/store/index"
import { IMedia } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"
type Role = "admin" | "seller" | "courier" | "client"
export interface InitialState {
  userId: string
  name: string
  media: IMedia
  roles: Role[]
  accessToken: string
}
let initialState: InitialState = {
  userId: "",
  name: "",
  media: {
    url: "",
    public_id: "",
    type: "image",
  },
  roles: [],
  accessToken: "",
}
export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (_, action) => {
      const user = action.payload
      //console.log("auth reducer >>", action.payload)
      return user
    },
    logout: (_) => {
      return
    },
  },
})
export const { setCredentials, logout } = authReducer.actions
export default authReducer.reducer
export const selectCurrentUser = (state: RootState) => state.auth
