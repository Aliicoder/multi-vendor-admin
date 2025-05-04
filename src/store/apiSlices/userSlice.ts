import { apiSlice } from "@/store/api/apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedSellers: builder.query({
      query: ({ name, sellerStatus, roles, curPage, perPage, sort }) => {
        const queryString = [
          name ? `name=${name}` : ``,
          sellerStatus ? `sellerStatus=${sellerStatus}` : ``,
          roles ? `roles=${roles}` : ``,
          curPage ? `curPage=${curPage}` : ``,
          perPage ? `perPage=${perPage}` : ``,
          sort ? `sort=${sort}` : `sort=[]`,
        ]
          .filter(Boolean)
          .join("&&");
        //console.log(queryString)
        return `/users/paginated?${queryString}`;
      },
      providesTags: ["Sellers"],
    }),
    acceptApplicant: builder.mutation({
      query: (credentials) => {
        return {
          url: `/users/${credentials.userId}/accept`,
          method: "PATCH",
        };
      },
    }),
    rejectApplicant: builder.mutation({
      query: (credentials) => {
        return {
          url: `/users/${credentials.userId}/reject`,
          method: "PATCH",
        };
      },
    }),
    getSellerById: builder.query({
      query: (credentials) => `/users/${credentials.userId}`,
    }),
    updateSellerProfile: builder.mutation({
      query: ({ userId, credentials }) => {
        return {
          url: `/users/${userId}`,
          method: "PATCH",
          body: credentials,
        };
      },
    }),
    fetchDashBoardData: builder.query({
      query: (_) => {
        return {
          url: `/admin/dashboard`,
          method: "GET",
        };
      },
    }),
    fetchSellersChunk: builder.mutation({
      query: (credentials) => {
        return {
          url: `/seller/chunk?perPage=${credentials.perPage}&&curPage=${credentials.curPage}&&searchValue=${credentials.searchValue}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useAcceptApplicantMutation,
  useRejectApplicantMutation,
  useGetPaginatedSellersQuery,
  useGetSellerByIdQuery,
  useUpdateSellerProfileMutation,
  useFetchSellersChunkMutation,
  useFetchDashBoardDataQuery,
} = userApiSlice;
