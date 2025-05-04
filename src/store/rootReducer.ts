import { apiSlice } from "@/store/api/apiSlice"
import authReducer from "./Reducers/authReducer"
const rootReducer = {
  [apiSlice.reducerPath]:apiSlice.reducer,
  auth:authReducer,
}
export default rootReducer