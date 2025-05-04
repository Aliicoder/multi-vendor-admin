import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useRef } from "react"
const IMAGES = [
  "/IMG1.jpg","/IMG1.jpg","/IMG1.jpg"
]

function BannerCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <Carousel
    plugins={[plugin.current]}
    className="container mt-2 w-full mx-auto  shadow-md rounded-md overflow-hidden "
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}
  >
    <CarouselContent className="">
      {IMAGES.map((url, index) => (
        <CarouselItem className="" key={index}>
          <div className="">
            <Card>
                <CardContent className="flex aspect-triangle overflow-hidden  items-center justify-center p-0  lg:rounded-md  ">
                  <img className="object-contain" src={url} alt="" loading="lazy"/>
                </CardContent>
              </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="hidden" />
    <CarouselNext className="hidden" />
  </Carousel>

  )
}

export default BannerCarousel