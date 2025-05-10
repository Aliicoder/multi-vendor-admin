import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import loginValidation from "@/validations/loginValidation";
import toast from "react-hot-toast";
import { useAdminLoginMutation } from "@/store/apiSlices/authSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/Reducers/authReducer";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

import CustomButton from "../buttons/CustomButton";
import { GoogleSignInButton } from "../buttons/GoogleSignIn";

const LogInForm = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [login, { isLoading }] = useAdminLoginMutation();
  const from = location?.state?.from?.pathname || "/";
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
  });
  const handleShowInput = (status: boolean) => {
    if (status == true) return setShowInput(true);
    setShowInput(false);
  };
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    try {
      const response = await login(values).unwrap();
      dispatch(setCredentials(response.user));
      toast.success(response.message);
      navigate(from, { state: { from: location.pathname } });
    } catch (error: any) {
      toast.error(error?.data?.message ?? "unknown error occurred");
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-lvh bg-blue-500  ">
      <Form {...form}>
        <form
          className="relative space-8 w-[300px] border border-solid p-5 rounded-sm bg-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Email" required {...field} />
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
                    {showInput ? (
                      <VscEye
                        onClick={() => handleShowInput(false)}
                        className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                      />
                    ) : (
                      <VscEyeClosed
                        onClick={() => handleShowInput(true)}
                        className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    <Input
                      type={showInput ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Forgot your password ?{" "}
                  <span className="underline cursor-pointer">
                    change password
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5 gap-3 flex flex-col">
            <CustomButton
              className=" bg-black !text-white"
              {...(isLoading == true ? dispatch : null)}
            >
              Login
            </CustomButton>

            <GoogleSignInButton />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LogInForm;
