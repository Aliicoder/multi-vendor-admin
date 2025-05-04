import { Button } from "@/components/ui/button"
import { MdPublishedWithChanges } from "react-icons/md";
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
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function SellerProfilePasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }
  return (
    <div>
      <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} 
        className={`space-y-8  w-full cp-10`}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  {"Forgot your password ? "} <span className="underline">confirm your account</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Enter the New password again </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
     
        <Button type="submit">Save Changes<span className="cp-l-6"><MdPublishedWithChanges /></span> </Button>
      </form>
    </Form>
    </div>
  )
}

export default SellerProfilePasswordPage