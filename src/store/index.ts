import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { apiSlice } from "@/store/api/apiSlice";

const store = configureStore({
  reducer:rootReducer,
  middleware: getDefaultMiddleware =>{
    return getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
  },
  devTools:true
})
export default store
export type RootState = ReturnType<typeof store.getState>