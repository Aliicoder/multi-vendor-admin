import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useFetchCategoriesMutation } from "@/store/Reducers/categoryApiSlice"
import { createRef, useRef } from "react"
import { useEffect, useState } from "react"
import { useCategories } from "@/hooks/useCategories";

function CategoriesCarousel() { 
  const [fetchCategoriesMutation] = useFetchCategoriesMutation()
  const {categories,setCategories} = useCategories()
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleImageLoad = (imgRef, containerRef) => {
    const imgHeight = imgRef.current.offsetHeight;
    const containerHeight = containerRef.current.offsetHeight;
    if (imgHeight > containerHeight) {
      imgRef.current.classList.add('w-full');
      imgRef.current.classList.remove('h-full');
    } else {
      imgRef.current.classList.add('h-full');
      imgRef.current.classList.remove('w-full');
    }
  };
  useEffect(() =>{
    const fetchCategoriesProducts = async () =>{
      const response = await fetchCategoriesMutation({}).unwrap(); //console.log("response >>",response)
      setCategories(response?.categories);
    }
    fetchCategoriesProducts()
  },[])
  return (
    <Carousel className="container mx-auto relative mt-4 w-full">
      <div className="relative flex justify-end  items-center">
        <h1 className="relative z-10  px-8 text-blue-500 bg-[var(--main-color)]">Categories</h1>
      </div>
      <CarouselContent className="-ml-1">
        {categories&&categories.map((category, i) => {
          if (!imgRefs.current[i]) 
          imgRefs.current[i] = createRef();
          if (!containerRefs.current[i]) 
            containerRefs.current[i] = createRef();
         return (
            <CarouselItem key={i} className="pl-1 basis-2/12  md:basis-1/2 lg:basis-1/12">
            <div className="p-1">
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="flex flex-col gap-3 aspect-square items-center justify-center p-6">
                  <div ref={containerRefs.current[i]} className=" flex justify-center items-center aspect-square overflow-hidden rounded-full border">
                    <img  ref={imgRefs.current[i]} 
                     className="" src={category.image.url} alt={`${category.name} img`}  onLoad={() => handleImageLoad(imgRefs.current[i], containerRefs.current[i])} />
                  </div>
                  <div className="flex justify-center items-center">
                    <h1 className="c3">{category.name}</h1>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
         )
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden"  />
      <CarouselNext className="hidden" />
    </Carousel>
  )
}


export default CategoriesCarousel