import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "@/store/Reducers/authReducer";
import { RootState } from "@/store";
import { AuthResponse, HttpStatus } from "@/types/types";
export type Role = "admin" | "seller" | "client" | "courier";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { accessToken } = state.auth;
    headers.set("authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let response: any = await baseQuery(args, api, extraOptions);
  console.log("response ", response);
  switch (response?.error?.originalStatus || response?.error?.status) {
    case HttpStatus.FORBIDDEN:
      const refreshResult = await baseQuery(
        "/users/refresh",
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const { user } = refreshResult.data as AuthResponse;
        api.dispatch(setCredentials(user));
        response = await baseQuery(args, api, extraOptions);
      } else api.dispatch(clearCredentials());

      break;

    case HttpStatus.UNAUTHORIZED:
      api.dispatch(clearCredentials());
      break;
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Sellers", "Chats", "Products"],
  endpoints: () => ({}),
});
