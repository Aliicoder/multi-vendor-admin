import { apiSlice } from "@/store/api/apiSlice";
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategoriesQuery: builder.query({
      query: () => `/categories`,
    }),
    FetchCategoriesChunk: builder.query({
      query: ({ name, level, curPage, perPage, sort }) => {
        const queryString = [
          name && `name=${name}`,
          level && `level=${level}`,
          perPage && `perPage=${perPage}`,
          curPage && `curPage=${curPage}`,
          sort && `sort=${sort}`,
        ]
          .filter(Boolean)
          .join("&&");
        return `/categories/paginated?${queryString}`;
      },
    }),
    creatCategory: builder.mutation({
      query: (credentials) => {
        return {
          url: "/categories",
          method: "POST",
          body: credentials,
        };
      },
    }),
    deleteCategory: builder.mutation({
      query: (credentials) => {
        return {
          url: `/categories?categoryId=${credentials._id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useFetchCategoriesQueryQuery,
  useFetchCategoriesChunkQuery,
  useCreatCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
