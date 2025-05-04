import { createRef, Dispatch, useCallback, useEffect, useRef, useState } from "react";
import Pagination from "../shared/Pagination";
import { LuShoppingCart } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { Counter } from "@/types/types";

interface FilteredProducts {
  filteredProducts:any
  counter:Counter
  setCounter:any
}
function FilteredProducts({filteredProducts,counter,setCounter}:FilteredProducts) {
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
  const handleLeft = () =>{
    setCounter((counter:Counter)=>{
      if(counter.curr > 1)
        return {...counter,prev:counter.prev-1,curr:counter.curr-1,next:counter.next-1}
      return counter
    })
  }
  const handleRight = () =>{
    setCounter((counter:Counter)=>{
      if(counter.curr < counter.pagesLen)
        return {...counter,prev:counter.prev+1,curr:counter.curr+1,next:counter.next+1}
      return counter
    })
  }
  return (
    <div className="flex flex-col montserrat">
      <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-4">
        {filteredProducts && filteredProducts.map((product:any, i:number) => {
          if (!imgRefs.current[i]) 
            imgRefs.current[i] = createRef();
          if (!containerRefs.current[i]) 
            containerRefs.current[i] = createRef();
          return (
            <div key={i + 1} className="group flex flex-col border shadow-sm rounded-md bg-white overflow-hidden -aspect-triangle hover:shadow-md">
              <div ref={containerRefs.current[i]} className="relative flex basis-2/3 justify-center items-center overflow-hidden">
                <img
                  ref={imgRefs.current[i]}
                  className=" transition-all"
                  src={product?.media[0].url}
                  loading="lazy"
                  onLoad={() => handleImageLoad(imgRefs.current[i], containerRefs.current[i])}
                />
                <div className="absolute left-1/2 -translate-x-1/2 translate-y-full top-full flex items-center gap-2 transition-all group-hover:top-1/2">
                  <div className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                    <MdFavoriteBorder />
                  </div>
                  <div  className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                    <LuShoppingCart />
                  </div>
                  <div className="flex justify-center items-center bg-white rounded-full cp-6 cursor-pointer">
                    <RiShareForwardLine />
                  </div>
                </div>
              </div>
              <div className="basis-1/3 flex flex-col gap-2 p-6 pt-3 shrink-0">
                <h1 className="c3 py-3 font-semibold">{product.name}</h1>
                <div className="flex justify-between gap-2">
                  <div className="flex justify-center items-center">
                    <h1 className="c3 text-center text hover:underline text-blue-500 cursor-pointer">show more</h1>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="cp-6 c3 font-semibold grow ">${product.price}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination counter={counter} onLeftClick={handleLeft} onRightClick={handleRight}/>
    </div>
  )
}

export default FilteredProducts