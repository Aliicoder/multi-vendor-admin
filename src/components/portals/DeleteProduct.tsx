import ReactDOM from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AiTwotoneDelete } from "react-icons/ai";
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
import IconButton from "../buttons/IconButton";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "@/store/apiSlices/productSlice"
interface DeleteProductParams {
  condition:boolean;
  product?:{
    name:string;
    _id:string;
  }
  onClick:()=>void
}
function DeleteProduct({condition,product,onClick}:DeleteProductParams) {
  const [deleteProductMutation,{isLoading}] = useDeleteProductMutation();
  const formSchema = z.object({
    productName: z.enum([`${product?.name}`],{
      message: `Delete Name is ${product?.name}`,
    })
  })

  let popUpsRef = useRef<HTMLDivElement | null>(null)
  const portalElement = document.getElementById("portals");
  if (!portalElement) {
    return null; 
  }
  const form = useForm<z.infer<typeof formSchema>>({resolver: zodResolver(formSchema)})
  const handleClosePopUp = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!popUpsRef.current?.contains(e.target as Node)){ console.log("hide categories")
      onClick()
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await deleteProductMutation(product).unwrap();console.log("response >>",response)
      toast.success(response.message)
      window.location.reload()
    } catch (error:any) { console.log(error)
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return ReactDOM.createPortal(
   <>
      {condition&&<div onClick={handleClosePopUp} className="absolute z-50 grid w-[100vw] h-[100vh] ">
       <div className="place-self-center" ref={popUpsRef}>
          <Form {...form}>
            <form   onSubmit={form.handleSubmit(onSubmit)} className="flex  flex-col border rounded-md cgap-6 bg-white p-4 w-[300px]  ">
              <div className="flex flex-row-reverse">
                <IoClose onClick={onClick} />
              </div>
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Product name</FormLabel>
                    <FormControl>
                      <Input placeholder={`type ${product?.name} `} {...field} />
                    </FormControl>
                    <FormDescription>
                      confirm product deletion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex cp-6 justify-end  ">
                <IconButton disabled={isLoading ? true : false}  className="bg-red-500" direction="left" text="Delete" >
                  <AiTwotoneDelete />
                </IconButton>
              </div>
            </form>
          </Form>
       </div>
      </div>}
   </>
    ,
    portalElement
  );
}

export default DeleteProduct;
