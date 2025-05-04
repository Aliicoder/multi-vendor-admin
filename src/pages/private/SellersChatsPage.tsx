import useSegment from "@/hooks/useSegment";
import { socket } from "@/lib/socket";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useFetchChatsQuery } from "@/store/apiSlices/chatSlice";
import { ISellerChat } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"

function SellersChatPage() {
  const {data:response} = useFetchChatsQuery({}); console.log("chats",response)
  const navigate = useNavigate()
  const activeAdminInfo = useSelector(selectCurrentUser)
  const secondSegment = useSegment(2)
  const [activeSellers,setActiveSellers] = useState<any[]>([])
  const handleGoToChat = (chat:ISellerChat) => {
   navigate(`/sellersChats/${chat._id}`,{state:{chat}})
  }
  useEffect(()=>{
    if(response?.chats){
      socket.connect()
      socket.emit("admin>>Connect>>seller",activeAdminInfo,response?.chats)
    }
    return () => {
      socket.disconnect()
    }
  },[response?.chats])
  useEffect(()=>{
    const handleReceivingSellerAndSendingSellerInfoThrowSellerSocket = (activeSellerInfo:any,activeSellerSocketId:any)=>{ console.log(" activeSellerInfo >>",activeSellerInfo)
      let isSellerExists = activeSellers.some((seller:any)=>(seller.userId ===  activeSellerInfo.userId))
      if(!isSellerExists)
        setActiveSellers((prev:any) =>[...prev,activeSellerInfo])
      socket.emit("admin>>SynAck>>seller",activeAdminInfo,activeSellerSocketId)
    }
    const handleReceivingSellerInfo = (activeSellerInfo:any)=>{  console.log("activeSellerInfo >>",activeSellerInfo)
      let isSellerExists = activeSellers.some((seller:any)=>(seller.userId ===  activeSellerInfo.userId))
      if(!isSellerExists)
        setActiveSellers((prev:any) =>[...prev,activeSellerInfo])
    }
    const handleDisconnectedSeller = (userId:any)=>{
      const filteredSellers = activeSellers.filter((seller:any) => seller.userId != userId)
      setActiveSellers(filteredSellers) ;//console.log(`user ${userId} disconnected`)
    }
    socket.on("seller>>Syn>>admin",handleReceivingSellerAndSendingSellerInfoThrowSellerSocket)
    socket.on("admin<<Ack<<seller",handleReceivingSellerInfo)
    socket.on("disconnected",handleDisconnectedSeller)
    return () =>{
      socket.off("seller>>Syn>>admin",handleReceivingSellerAndSendingSellerInfoThrowSellerSocket)
      socket.off("admin>>SynAck>>seller")
      socket.off("admin<<Ack<<seller",handleReceivingSellerInfo)
      socket.off("disconnected",handleDisconnectedSeller)
    }
  },[]);
  useEffect(()=>{
    console.log("activeSellers >>",activeSellers)
  },[activeSellers])
  return (
  <div className=' flex montserrat  w-full h-full'>
    <div className='flex border-r flex-col basis-3/12 bg-slate-100 ' >
      <div>
        <h1 className='font-bold cp-24 c3'>Chats</h1>
      </div>

      <div className='flex flex-col'>
        {
          response?.chats&&response?.chats.map((chat:ISellerChat)=>(
            <div key={chat._id}
              onClick={()=>handleGoToChat(chat)} 
              className={`${secondSegment == chat._id ? "bg-white" : ""} flex basis-6/12 justify-center ch-70 hover:bg-white  items-center gap-3 `}>
                  <div className="basis-3/12 scale-75 aspect-square ">
                    <div className={` 
                        ${
                    activeSellers.find((seller)=> seller.userId == chat.seller._id) ?
                        "bg-green-300" 
                      :
                        "bg-slate-300" 
                        }
                        h-full rounded-full p-[3%]`}>
                      <img className='w-full h-full object-cover rounded-full' src={chat?.seller?.avatar || "/fb.jpg"} alt="" />
                    </div>
                </div>       

              <div className="basis-6/12 ">
                <h1 className='c3 font-bold'>{chat?.seller?.businessName}</h1>
                <h1 className='c2'>{chat?.recentMessage || <span className="text-green-400">start the chat</span> }</h1>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    {
      secondSegment ? 
        <Outlet />
      :
      <div className="grid place-items-center basis-9/12 text-blue-500">
        select a chat
      </div>
    }
  </div>
  )
}

export default SellersChatPage