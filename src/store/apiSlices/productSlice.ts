import { apiSlice } from "@/store/api/apiSlice"
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    AddProduct: builder.mutation({
      query: ({ credentials }) => {
        return {
          url: "/products",
          method: "POST",
          body: credentials,
        }
      },
    }),
    getPaginatedProducts: builder.query({
      query: ({
        _id,
        name,
        brand,
        outOfStock,
        sellerId,
        perPage,
        curPage,
        sort,
      }) => {
        const queryString = [
          _id && `_id=${_id}`,
          name && `name=${name}`,
          brand && `brand=${brand}`,
          outOfStock && `outOfStock=${outOfStock}`,
          sellerId && `sellerId=${sellerId}`,
          curPage && `curPage=${curPage}`,
          perPage && `perPage=${perPage}`,
          sort && `sort=${sort}`,
        ]
          .filter(Boolean)
          .join("&&")
        console.log(queryString)
        return `/products/paginated?${queryString}`
      },
      providesTags: ["Products"],
    }),
    getProduct: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/products?productId=${productId}`,
          method: "GET",
        }
      },
    }),
    editProduct: builder.mutation({
      query: ({ productId, credentials }) => {
        return {
          url: `/products/${productId}`,
          method: "PATCH",
          body: credentials,
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/products/${productId}`,
          method: "DELETE",
        }
      },
    }),
  }),
})
export const {
  useAddProductMutation,
  useGetProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetPaginatedProductsQuery,
  util,
} = productApiSlice
