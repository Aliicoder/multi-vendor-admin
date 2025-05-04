import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReactDOM from "react-dom"
import { useRef } from "react"
interface PortalImageSlider {
  imgUrls: string[] | undefined
  condition: boolean
  setImageScrollShow: React.Dispatch<React.SetStateAction<boolean>>
}
import { IoIosCloseCircleOutline } from "react-icons/io";
function PortalImageSlider({condition,imgUrls,setImageScrollShow}:PortalImageSlider) {
  const portalElement = document.getElementById("portals");
  if (!portalElement) {
    return null; 
  }
  const handleCloseSlider = () => {
    setImageScrollShow(false)
  }
  return ReactDOM.createPortal(
   <>
    {
      condition && <div  className="absolute z-50 grid w-[100vw] h-[100vh] bg-black">
        <Carousel  className="w-full relative max-w-xs place-self-center">
          
          <CarouselContent className="flex items-center">
            {imgUrls&&imgUrls.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl flex items-center font-semibold">
                        <img className="object-contain" src={img} alt="" />
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    }
   </>
     ,
     portalElement
   );
}

export default PortalImageSlider