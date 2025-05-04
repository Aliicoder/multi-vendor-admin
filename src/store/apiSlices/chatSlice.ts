import { apiSlice } from "@/store/api/apiSlice"
export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    FetchChats:builder.query({
      query:()=>{ //console.log("Fetch chat credentials",credentials)
        return {
          url:`/chat/admin/sellers`,
          method:'GET',
        };
      },
      providesTags:["Chats"]
    }),
    FetchSellerChatMessages:builder.query({
      query:(credentials)=>{ //console.log("Fetch chat credentials",credentials)
        return {
          url:`/chat/admin/seller/${credentials.chatId}`,
          method:'GET',
        }
      },
    }),
    addSellerMessage:builder.mutation({
      query:(credentials)=>{ console.log("addMessage credentials",credentials)
        return {
          url:`/chat/admin/seller/${credentials.chatId}`,
          method:'POST',
          body:{
            message:credentials.message,
            receiverId:credentials.receiverId
          }
        };
      },
      invalidatesTags:["Chats"]
    }),
    establishChat:builder.mutation({
      query:(credentials)=>{ //console.log("Fetch chat credentials",credentials)
        return {
          url:`/chat/admin/seller/establish/${credentials.sellerId}`,
          method:'GET',
        }
      }
    }),
  })
})
export const {
  useFetchChatsQuery,
  useFetchSellerChatMessagesQuery,
  useAddSellerMessageMutation,
  useEstablishChatMutation
} = chatApiSlice