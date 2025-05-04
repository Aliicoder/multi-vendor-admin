import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { TbEditCircle, TbEditCircleOff } from "react-icons/tb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useUpdateSellerProfileMutation } from "@/store/apiSlices/userSlice"
import { ISeller } from "@/types/types"
import toast from "react-hot-toast"
import CustomButton from "../buttons/CustomButton"
import { errorToast } from "@/lib/utils"
import formData from "@/lib/helpers/formData"
import accountInfoValidation from "@/validations/accountInfoValidation"
interface SellerAccountInfoParams {
  seller: ISeller
}
function SellerAccountForm({ seller }: SellerAccountInfoParams) {
  const [editForm, setEditForm] = useState(false)
  const [updateSellerProfileMutation] = useUpdateSellerProfileMutation()

  useEffect(() => {
    form.setValue("email", seller?.email)
    form.setValue("payment", seller?.payment)
    form.setValue("status", seller?.status)
    form.setValue("subscription", "standard")
  }, [seller])

  const form = useForm<z.infer<typeof accountInfoValidation>>({
    resolver: zodResolver(accountInfoValidation),
  })

  async function onSubmit(values: z.infer<typeof accountInfoValidation>) {
    try {
      const credentials = formData(values)
      const response = await updateSellerProfileMutation({
        userId: seller._id,
        credentials,
      }).unwrap()
      toast.success(response.message)
    } catch (error) {
      errorToast(error)
    }
  }

  return (
    <Form {...form}>
      <form
        id="account-information"
        onSubmit={form.handleSubmit(onSubmit)}
        className={` p-6 space-y-8 w-full  flex flex-col rounded-lg shadow-sm border border-neutral-100 shadow-neutral-100 bg-white`}
      >
        <div className="flex justify-between ">
          <h1 className="font-bold text-blue-600">seller profile</h1>
          {editForm ? (
            <div className="gap-3 flex items-center ">
              <CustomButton
                type="submit"
                form="account-information"
                theme="black"
                className="text-sm"
              >
                submit
              </CustomButton>

              <CustomButton
                className=" gap-3 flex items-center !border-0 !shadow-none"
                onClick={() => setEditForm(!editForm)}
              >
                <TbEditCircleOff />
              </CustomButton>
            </div>
          ) : (
            <CustomButton
              className=" gap-3 flex items-center !border-0 !shadow-none"
              onClick={() => setEditForm(!editForm)}
            >
              <TbEditCircle />
            </CustomButton>
          )}
        </div>

        <div
          className={`flex gap-[3%] items-center  flex-grow ${
            editForm ? "" : "pointer-events-none opacity-75"
          }`}
        >
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className={`border-0 shadow-none`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="opacity-0">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-1/2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">active</SelectItem>
                      <SelectItem value="inactive">inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-1/2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="fulfilled">fulfilled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-1/2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="standard">standard</SelectItem>
                      <SelectItem value="premium">premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SellerAccountForm
