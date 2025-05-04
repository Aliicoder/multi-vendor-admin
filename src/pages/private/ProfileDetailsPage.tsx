// import SellerGeneralInfoForm from "@/components/forms/SellerGeneralInfo"
// import SellerBusinessInfoForm from "@/components/forms/SellerBusinessInfoForm"
// import SellerAccountInfo from "@/components/forms/SellerAccountInfo"
// import { useEffect, useState } from "react"
// import toast from "react-hot-toast"
// import { useFetchProfileMutation } from "@/store/apiSlices/authSlice";
// function ProfileDetailsPage() {
//   const [fetchProfileDetailsMutation,{isLoading}]= useFetchProfileMutation()
//   const [profile,setProfile]=useState<any>({})
//   useEffect(()=>{
//     const fetchProfileDetails = async () =>{
//       try {
//         const response = await fetchProfileDetailsMutation({}).unwrap(); console.log("response >>",response)
//         setProfile(response.profile)
//         toast.success(response.message)
//       } catch (error:any) { console.log("error >>",error)
//         toast.error(error?.data?.message ?? "try again later")
//       }
//     }
//     fetchProfileDetails()
//   },[])
//   return (
//     <div className='w-10/12 relative flex flex-col gap-4 h-[100vh] overflow-hidden cp-3_10 bg-white'>
//       <SellerGeneralInfoForm
//         name={profile?.seller?.name}
//         image={profile?.seller?.avatar}/>
//       <SellerBusinessInfoForm
//         name={profile?.businessInformation?.name}
//         state={profile?.businessInformation?.state}
//         district={profile?.businessInformation?.district}
//         subDistrict={profile?.business?.subDistrict}/>
//       <SellerAccountInfo
//         email={profile?.seller?.email}
//         status={profile?.seller?.status}
//         payment={profile?.seller?.payment}
//         role={"seller"}/>
//   </div>
//   )
// }

// export default ProfileDetailsPage
