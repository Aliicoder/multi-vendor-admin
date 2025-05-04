import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { TbEditCircle } from "react-icons/tb"
import generalInfoValidation from "@/validations/generalInfoValidation"
import CustomButton from "../buttons/CustomButton"
import { useUpdateSellerProfileMutation } from "@/store/apiSlices/userSlice"
import { cn, errorToast, getInitials, successToast } from "@/lib/utils"
import formData from "@/lib/helpers/formData"
import { TbEditCircleOff } from "react-icons/tb"
import { IUser } from "@/types/types"
interface SellerGeneralInfoFormParams {
  seller: IUser
}
function SellerGeneralInfoForm({ seller }: SellerGeneralInfoFormParams) {
  const [editForm, setEditForm] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateSellerProfileMutation] = useUpdateSellerProfileMutation()
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: File) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      fieldChange(e.target.files[0])
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const form = useForm<z.infer<typeof generalInfoValidation>>({
    resolver: zodResolver(generalInfoValidation),
  })
  async function onSubmit(values: z.infer<typeof generalInfoValidation>) {
    try {
      const credentials = formData(values)
      const response = await updateSellerProfileMutation({
        sellerId: seller._id,
        credentials,
      }).unwrap()
      successToast(response)
    } catch (error) {
      errorToast(error)
    }
  }

  useEffect(() => {
    form.setValue("name", seller?.name)
    form.setValue("description", seller?.description)
    setAvatarUrl(seller?.media?.url)
  }, [seller?.name])
  return (
    <Form {...form}>
      <form
        id="seller-information"
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className={`p-6 space-y-8 w-full  flex flex-col rounded-lg shadow-sm border border-neutral-100 shadow-neutral-100 bg-white`}
      >
        <div className="flex justify-between ">
          <h1 className="font-bold text-blue-600">seller profile</h1>
          {editForm ? (
            <div className="gap-3 flex items-center ">
              <CustomButton
                type="submit"
                form="seller-information"
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
              className="gap-3 flex items-center !border-0 !shadow-none"
              onClick={() => setEditForm(!editForm)}
            >
              <TbEditCircle />
            </CustomButton>
          )}
        </div>

        <div
          className={cn(
            editForm ? "" : "pointer-events-non opacity-75",
            "flex items-center"
          )}
        >
          <div
            className="size-10 m-5 flex justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                            bg-blue-500 text-white"
          >
            {getInitials(seller.name)}
          </div>

          <div className="  flex flex-col ">
            {editForm ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input
                        className={`${editForm ? "" : "border-0 shadow-none"}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <h1>@{seller.name}</h1>
            )}
            <h1>{seller.email}</h1>
            {/* 
            <div className="gap-3 flex">
              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <CustomButton
                        type="button"
                        onClick={triggerFileInput}
                        className="c5 px-3 py-2 gap-3 | flex items-center | font-medium border rounded-lg  text-blue-500 bg-white"
                      >
                        <Input
                          ref={inputRef}
                          className="absolute z-10 top-0 left-0 opacity-0 max-w-full max-h-full"
                          onChange={(e) => handleFileChange(e, field.onChange)}
                          type="file"
                          accept="image/*"
                          placeholder="upload the video"
                        />
                        Edit
                      </CustomButton>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CustomButton
                type="button"
                className="c5 px-3 py-2 gap-3 | flex items-center | font-medium border rounded-lg  text-red-400 bg-white"
              >
                Delete
              </CustomButton>
            </div> */}
          </div>
        </div>
        <div
          className={cn(
            "p-5 gap-1 flex flex-col",
            editForm ? "" : "pointer-events-non opacity-75"
          )}
        >
          <h1 className=" font-semibold text-fs-16">Description</h1>
          <h1 className="text-fs-13">
            {editForm ? (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input
                        className={`${editForm ? "" : "border-0 shadow-none"}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <h1>{seller.description}</h1>
            )}
          </h1>
        </div>
      </form>
    </Form>
  )
}

export default SellerGeneralInfoForm
