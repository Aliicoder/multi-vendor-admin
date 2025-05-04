// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { useEffect, useState } from "react";
// import IconButton from "../buttons/IconButton"
// import { TbEditCircle } from "react-icons/tb";
// import toast from "react-hot-toast"
// import { useEditShopInfoMutation } from "@/store/apiSlices/authSlice";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   state: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   district: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   subDistrict: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })
// interface SellerBusinessInfoFormParams{
//     name:string
//     state:string
//     district:string
//     subDistrict:string
// }
// function SellerBusinessInfoForm({name,state,district,subDistrict}:SellerBusinessInfoFormParams) {
//   const [editForm,setEditForm] = useState(false)
//   const [editShopInfoMutation,{isLoading}] = useEditShopInfoMutation()
//   const form = useForm<z.infer<typeof formSchema>>({resolver: zodResolver(formSchema)})

//   const handleEdit = () =>{
//     setEditForm(!editForm)
//   }
//   useEffect(() =>{
//     form.setValue("name",name)
//     form.setValue("state",state)
//     form.setValue("district",district)
//     form.setValue("subDistrict",subDistrict)
//   },[name])
//   const placePlaceHolder = (value:string,placeholder:string)=>{
//     if(value) return
//     return {placeholder}
//   }
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       const response = await editShopInfoMutation(values).unwrap()
//       toast.success(response.message)
//       setEditForm(false)
//     } catch (error:any) {
//       toast.error(error?.data?.message ?? "try again later")
//     }
//   }
//   return (
//     <div className=' p-[2%] border rounded-md bg-white'>
//       <div className="flex flex-row-reverse items-start">
//         {
//           editForm ?
//           <div className="flex items-center" >
//             <IconButton  type="submit" text="Save changes" direction={"left"}>
//             </IconButton>
//             <IconButton className="ml-3 border text-black bg-white hover:bg-white" onClick={handleEdit} text="Cancel" direction={"left"}>
//             </IconButton>
//           </div>
//           :
//           <IconButton className=" border text-black bg-white hover:bg-white" text="Edit" onClick={handleEdit} direction={"left"}>
//             <TbEditCircle />
//           </IconButton>
//         }
//     </div>
//     <Form {...form}>
//       <form  onSubmit={form.handleSubmit(onSubmit)} className={ `flex space-y-8  w-full cp-10`}>
//         <div className={`flex gap-[3%] items-center  flex-grow ${editForm ? "":"pointer-events-none opacity-75"}`}>
//           <div className="flex flex-col gap-3 w-full">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="">
//                   <FormLabel>Shop Name</FormLabel>
//                   <FormControl>
//                     <Input disabled className="border-0" {...placePlaceHolder(name,"")} {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//             control={form.control}
//             name="state"
//             render={({ field }) => (
//               <FormItem className="">
//                 <FormLabel>State Name</FormLabel>
//                 <FormControl>
//                   <Input className={`${editForm ?"":"border-0"}`} {...placePlaceHolder(state,"set state name")}  {...field} />
//                 </FormControl>
//                 <FormDescription className="opacity-0">
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           </div>
//           <div className="flex flex-col gap-3 w-full">
//             <FormField
//               control={form.control}
//               name="district"
//               render={({ field }) => (
//                 <FormItem className="">
//                   <FormLabel>District Name</FormLabel>
//                   <FormControl>
//                     <Input className={`${editForm ?"":"border-0"}`} {...placePlaceHolder(district,"set district name")} {...field} />
//                   </FormControl>
//                   <FormDescription className="opacity-0">
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//             control={form.control}
//             name="subDistrict"
//             render={({ field }) => (
//               <FormItem className="">
//                 <FormLabel>Sub district</FormLabel>
//                 <FormControl>
//                   <Input className={`${editForm ?"":"border-0"}`} {...placePlaceHolder(subDistrict,"set sub district name")} {...field} />
//                 </FormControl>
//                 <FormDescription className="opacity-0">
//                   This is your public display name.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           </div>
//         </div>

//       </form>
//     </Form>
//     </div>
//   )
// }

// export default SellerBusinessInfoForm
