import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form,FormControl,FormField, FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import signupValidation from "@/validations/signupValidation";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch} from "react-redux";
import ConditionalLoader from "@/components/conditionals/ConditionalLoader";
import { Label } from "@radix-ui/react-label";
import { useSignupMutation } from "@/store/Reducers/authApiSlice";
import { setCredentials } from "@/store/Reducers/authReducer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import IconButton from "../buttons/IconButton";
import { IoLogIn } from "react-icons/io5";
import { useState } from "react"
import { VscEye, VscEyeClosed } from "react-icons/vsc"

const SignUpForm = () => {
  const [signup,{isLoading}] = useSignupMutation();
  const [showInput,setShowInput] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/dashboard"
  const form = useForm<z.infer<typeof signupValidation>>({resolver: zodResolver(signupValidation)})
  const handleShowInput = (status:boolean) =>{
    if(status == true)
      return setShowInput(true)
    setShowInput(false)
  }
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const response = await signup(values).unwrap()
    dispatch(setCredentials(response.user))
    toast.success(response.message)
    navigate(from)
  }
  return ( 
   <div className="flex justify-center items-center pl-28 w-[50%] h-lvh bg-slate-50 ">
      <Form {...form}>
      <motion.form
        initial={{
          x:"-100vw"
        }} 
        animate={{
          x:0,
        }}
        exit={{
          x:"100vw"
        }}
       className="relative space-8  border border-solid  p-5 rounded-sm bg-white" 
       onSubmit={form.handleSubmit(onSubmit)} >
        <ConditionalLoader condition={isLoading} />
        <div className="c6 p-6 roboto font-normal montserrat">Welcome to souq <span className='text-blue-600'>.</span></div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="on" placeholder="" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="on" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" autoComplete="on" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                   { 
                    showInput ? 
                    <VscEye onClick={()=>handleShowInput(false)} className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"/>
                    :
                    <VscEyeClosed onClick={()=>handleShowInput(true)} className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2" />
                  }
                  <Input type={showInput ? "text" : "password"}  autoComplete="on" placeholder="" required {...field} />
                </div>      
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter The Password again</FormLabel>
              <FormControl>
                <Input type={showInput ? "text" : "password"}  autoComplete="on" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex gap-3 cp-6 items-center ">
              <FormControl>
              <Checkbox
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
                <Label htmlFor="terms" className="p-0 !mt-0 montserrat c2">
                  I agree to the privacy policy and term
                </Label>
            </FormItem>
          )}
        />
        <div className="flex justify-end cp-24">
          <IconButton {...( isLoading == true ? dispatch: null)} text="Sign up" direction={"right"}>
            <IoLogIn />
          </IconButton>
        </div>
        <h1 className="py-3 c2 mulish font-semibold text-center">Already Sign up ? <Link className="underline text-blue-400" to="/login">Sign in</Link> </h1>
      </motion.form>
    </Form>
   </div>
   );
}
 
export default SignUpForm;