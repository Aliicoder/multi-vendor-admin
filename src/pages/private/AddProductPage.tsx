import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFetchCategoriesNamesMutation } from "@/store/apiSlices/categorySlice";
import { useAddProductMutation } from "@/store/apiSlices/productSlice";
import toast from "react-hot-toast";
import IconButton from "@/components/buttons/IconButton"
import { GrCloudUpload } from "react-icons/gr"
import productValidation from "@/validations/productValidations"
import { IoArrowBackOutline } from "react-icons/io5";
import LinkButton from "@/components/buttons/LinkButton"
function AddProductPage() { 
  const [previewMedia,setPreviewMedia] = useState({url:"",index:0})
  const [filteredCategories,setFilteredCategories] = useState<[]|undefined>([])
  const [searchValue,setSearchValue] = useState("")
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [showCategories,setShowCategories] = useState(false)
  const [files,setFiles] = useState<(File|string)[]>([])
  const [filesUrls,setFilesUrls] = useState<string[] | undefined>([])
  const [addProductPageMutation,{isLoading}] = useAddProductMutation()
  const [fetchCategoriesNamesMutation] = useFetchCategoriesNamesMutation()
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof productValidation>>(
    {resolver: zodResolver(productValidation),}
  )

  const handleSearchCategoryChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current as number); 
    }
    timeoutRef.current = setTimeout(() => {
      if(searchValue !== value) 
        setSearchValue(value);
    }, 1000);
  },[searchValue])

  const handleSetCategory = (e:any) =>{ //console.log("set category >>",e.target.textContent)
    form.setValue("category", e.target.textContent)
    form.setValue("search", e.target.textContent)
  }
  const handleShowCategories = (e:any) =>{
    console.log("show categories")
    setShowCategories(true)
  }
  const handleMedia = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files&&e.target.files.length > 0){
      let newFiles = e.target.files
      let urls = []
      for(let file of newFiles)
        urls.push(URL.createObjectURL(file))
      setFiles([...files,...newFiles])
      setFilesUrls([...filesUrls,...urls])
    }
  }
  const handleImgChange = (img:File) =>{
    if(img && files && filesUrls){ //console.log("previewIndex>>",previewMedia.index)
     let tempFiles = [...files] ; //console.log("Files >>",tempFiles)
     let tempFilesUrls = [...filesUrls] ; //console.log("FilesUrls >>",tempFilesUrls)
     let url = URL.createObjectURL(img) ; //console.log("url >>",url)
     tempFiles[previewMedia.index] = img ; //console.log("updatedFilesIndex >>",tempFilesUrls[previewMedia.index])
     tempFilesUrls[previewMedia.index] = url ; //console.log("updatedFilesUrlsIndex >>",tempFilesUrls[previewMedia.index]);
     setFiles([...tempFiles])
     setFilesUrls([...tempFilesUrls])
    }
  }
  const handleClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    if(!categoriesRef.current?.contains(e.target as Node)){ //console.log("hide categories")
      setShowCategories(false)
    }
  }
  const handleImgRemove = () =>{console.log(previewMedia.index)
    if(files && filesUrls){
      const updatedFiles = files.filter((file,index)=> index != previewMedia.index )
      const updatedFilesUrls = filesUrls.filter((file,index)=> index != previewMedia.index)
      setFiles([...updatedFiles])
      setFilesUrls([...updatedFilesUrls])
      form.setValue("media",updatedFiles)
    } 
  }
  const handlePreviewMedia = (imgIndex:number) =>{ 
    if(filesUrls){ 
      setPreviewMedia({url:filesUrls[imgIndex],index:imgIndex});
    }
  }
  useEffect(() =>{
    if(files)
      form.setValue("media",files);
    console.log("formFiles >>",form.getValues("media"))
    console.log("stateFiles >>",files)
    console.log("FilesUrls >>",filesUrls)
    if(filesUrls && filesUrls[0])
      setPreviewMedia({url:filesUrls[0],index:0})
    else
      setPreviewMedia({url:"",index:0})
  },[files,filesUrls])
  useEffect(() =>{
    if(searchValue != ""){
     const fetchCategoriesNames = async ()=>{
      try{
        console.log("searching >>",searchValue)
        const { categories } = await fetchCategoriesNamesMutation({searchValue}).unwrap(); //console.log("filtered categories",categories)
        setFilteredCategories(categories)
      }catch(error){

      }
     }
     fetchCategoriesNames()
    } 
    else
      setFilteredCategories([])
  },[searchValue])

  async function onSubmit(values: z.infer<typeof productValidation>) {
    try {
      console.log(values)
      const response = await addProductPageMutation(values).unwrap()
      toast.success(response.message)
    } catch (error:any) { console.log(error)
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return (
    <>
      <LinkButton className="montserrat sticky top-0 font-semibold gap-[1%] bg-transparent text-slate-700 shadow-none p-[2%]" text="Back" direction={"left"} to={"/products"}>
        <IoArrowBackOutline />
      </LinkButton>
      <div onClick={handleClose} className=" relative flex justify-center items-center pb-[3%] w-full ">
         <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col z-10 space-y-8 gap-3 w-[70%]  p-[3%]  border rounded-md bg-white  mx-auto">
            <div className="flex gap-6 ">
              <div className="flex flex-col  w-8/12">
                  <div className="flex flex-col rounded-md p-[5%] gap-6">
                    <h1 className="font-medium py-[6%]">General Information</h1>
                    <div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input className="bg-white" onChangeCapture={()=>form.clearErrors()} placeholder="~Nike V2K" {...field} />
                            </FormControl>
                            <FormDescription>
                              Make sure name not duplicate
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                              <Textarea
                                onChangeCapture={()=>form.clearErrors()}
                                placeholder="~Nike new edition running shoes"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter brief description
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="fle rounded-md flex-col p-[6%] gap-6"> 
                    <h1 className="font-medium  py-[6%]">Pricing and Stock</h1>
                    <div className="flex gap-6">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                              <Input placeholder="~Nike" onChangeCapture={()=>form.clearErrors()} {...field} />
                            </FormControl>
                          
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input onChangeCapture={()=>form.clearErrors()} placeholder="~1000" {...field} />
                          </FormControl>
                          
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex  gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input onChangeCapture={()=>form.clearErrors()} placeholder="~100$" {...field} />
                          </FormControl>
                        
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Discount {"(optional)"}</FormLabel>
                          <FormControl>
                            <Input onChangeCapture={()=>form.clearErrors()} placeholder="~10%" {...field} />
                          </FormControl>
                      
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                  
              </div>
              <div className="w-4/12 ">
                <div className="flex flex-col h-[100%] p-[10%] justify-between gap-6">
                  <div className="grow flex justify-between flex-col gap-6">
                    <div className="flex flex-col grow h-3/4  bg-slate-50 cp-6 rounded-md">
                      {
                        previewMedia.url
                        &&
                        <div className="flex justify-end  ">
                          <div className="relative c2 p-1 bg-white rounded-sm  ">
                            <input onChange={(e)=>handleImgChange(e?.target?.files[0])} className="z-10 absolute w-full h-full opacity-0" type="file" />
                            <AiFillEdit />
                          </div>
                          <div onClick={handleImgRemove} className="c2  p-1  bg-white rounded-sm ">
                            <FaDeleteLeft />
                          </div>
                        </div> 
                      }
                      <div className="bg-white w-full flex  justify-center items-center  overflow-hidden h-full rounded-md">
                        <img className="object-contain h-full" src={previewMedia.url} alt="" />
                      </div>
                    </div>
                    <div className="flex w-full flex-wrap">
                      <FormField
                        control={form.control}
                        name="media"
                        render={({field}) => (
                          <FormItem className="h-full flex-shrink-0 w-1/4">
                            <div className="relative hover:bg-slate-200 border rounded-md">
                              <FormControl >
                                <div className="h-full aspect-square">
                                  <Input  onChange={handleMedia} 
                                  className="absolute z-10 cursor-pointer opacity-0 w-full h-full" multiple  type="file" />
                                </div>
                              </FormControl>
                              <MdPermMedia className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {
                        filesUrls&&filesUrls.map((url,i) =>(
                          <div key={i} onClick={()=>handlePreviewMedia(i)} className=" flex-shrink-0 w-1/4 ">
                            <div className="relative flex flex-col aspect-square  rounded-sm overflow-hidden">
                              <div className="flex justify-center items-center overflow-hidden w-full">
                                <img className="object-contain   " src={url} alt="" />
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="flex flex-col  gap-6">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                          <FormItem className="hidden">
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input {...field} readOnly autoComplete="false" placeholder="" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                        <FormField
                        control={form.control}
                        name="search"
                        render={({field}) => (
                          <FormItem ref={categoriesRef}  className="w-full relative cp-6 rounded-md">
                            <FormLabel className="">Product Category</FormLabel>
                            <FormControl >
                              <Input {...field}
                              onFocus={handleShowCategories} onChangeCapture={handleSearchCategoryChange} 
                              autoComplete="false" placeholder="search your category" />
                            </FormControl>
                            <FormMessage />
                            {
                              showCategories ? 
                              <div 
                              className={`
                              ${filteredCategories?.length == 0 || filteredCategories == undefined ?"hidden":""} 
                              absolute flex p-2 fo flex-col gap-1 montserrat border  rounded-md  
                              cp-6 bg-white w-full left-0  `}>
                                {
                                  filteredCategories&&filteredCategories.map((category,i) =>(
                                    <div  key={i} className="hover:bg-slate-50 rounded-md cursor-pointer" onClick={handleSetCategory}>
                                      {category?.name}
                                    </div>
                                  ))
                                }
                              </div>
                              :
                              null 
                            }
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-[6%] ">
              <IconButton  direction="right" text="Add Product">
                <GrCloudUpload />
              </IconButton>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default AddProductPage

         