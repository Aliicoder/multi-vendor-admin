import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
function ProductsCarousels() {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
      <div>
        {/* <div className="relative flex  items-center ">
          <h1 className="relative z-10 bg-white px-8">Top rated</h1>
          <div className="absolute z-0 w-full top-1/2 h-1 bg-slate-50" />
        </div> */}
        <Carousel className="mt-4 w-full ">
          <CarouselContent className="-ml-1">
            {[1,2,3].map((list,index) => (
              <CarouselItem key={index} className="pl-1 basis-full">
                <div className="p-1">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardContent className="flex flex-col gap-3">
                      {
                        [1,2,3].map((product,index)=>(
                          <div key={index} className="flex relative border rounded-md shadow-sm bg-white hover:shadow-md transition-all ">
                            <div className="basis-1/3 flex p-5 justify-center items-center ">
                              <div className="aspect-square border  overflow-hidden rounded-full">
                                <img className="object-contain h-full" src="/IMG1.jpg" alt="" />
                              </div>
                            </div>
                            <div className="flex flex-col grow justify-center gap-2">
                              <h1 className="c6 lg:c3">Nike</h1>
                              <p className="c4 lg:c2">lorem</p>
                            </div>
                          </div>
                        ))
                      }
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden"  />
          <CarouselNext className="hidden" />
        </Carousel>
      </div>
      <div>
        {/* <div className="relative flex  items-center ">
          <h1 className="relative z-10 bg-white px-8">Top rated</h1>
          <div className="absolute z-0 w-full top-1/2 h-1 bg-slate-50" />
        </div> */}
        <Carousel className="mt-4 w-full ">
          <CarouselContent className="-ml-1">
            {[1,2,3].map((list,index) => (
              <CarouselItem key={index} className="pl-1 basis-full">
                <div className="p-1">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardContent className="flex flex-col gap-3">
                      {
                        [1,2,3].map((product,index)=>(
                          <div key={index} className="flex border rounded-md shadow-sm bg-white hover:shadow-md transition-all">
                            <div className="basis-1/3 flex p-5 justify-center items-center ">
                              <div className="aspect-square border  overflow-hidden rounded-full">
                                <img className="object-contain h-full" src="/IMG1.jpg" alt="" />
                              </div>
                            </div>
                            <div className="flex flex-col grow justify-center gap-2">
                              <h1 className="c6 lg:c3">Nike</h1>
                              <p className="c4 lg:c2">lorem</p>
                            </div>
                          </div>
                        ))
                      }
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden"  />
          <CarouselNext className="hidden" />
        </Carousel>
      </div>
      <div>
        {/* <div className="relative flex  items-center ">
          <h1 className="relative z-10 bg-white px-8">Top rated</h1>
          <div className="absolute z-0 w-full top-1/2 h-1 bg-slate-50" />
        </div> */}
        <Carousel className="mt-4 w-full ">
          <CarouselContent className="-ml-1">
            {[1,2,3].map((list,index) => (
              <CarouselItem key={index} className="pl-1 basis-full">
                <div className="p-1">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardContent className="flex flex-col gap-3">
                      {
                        [1,2,3].map((product,index)=>(
                          <div key={index} className="flex border rounded-md shadow-sm bg-white hover:shadow-md transition-all">
                            <div className="basis-1/3 flex p-5 justify-center items-center ">
                              <div className="aspect-square border  overflow-hidden rounded-full">
                                <img className="object-contain h-full" src="/IMG1.jpg" alt="" />
                              </div>
                            </div>
                            <div className="flex flex-col grow justify-center gap-2">
                              <h1 className="c6 lg:c3">Nike</h1>
                              <p className="c4 lg:c2">lorem</p>
                            </div>
                          </div>
                        ))
                      }
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden"  />
          <CarouselNext className="hidden" />
        </Carousel>
      </div>
    </div>
  )
}

export default ProductsCarousels