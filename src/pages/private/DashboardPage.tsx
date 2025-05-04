import { messages, stats } from "@/constants/dashboard"
import { HiArrowTrendingUp } from "react-icons/hi2"
import { HiArrowTrendingDown } from "react-icons/hi2"
import CountUp from "react-countup"
import { cn, getInitials } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import useSellersPagination from "@/hooks/useSellerPagination"
import { IProduct, ISeller } from "@/types/types"
import Loader from "@/components/Loaders/Loader"
import dateFormatter from "@/lib/helpers/dateFormatter"
import useProductsPagination from "@/hooks/useProductsPagination"
const perPage = 2
function SellerDashboard() {
  const statRef = useRef<HTMLDivElement>(null)
  const [statHeight, setStatHeight] = useState(0)
  const { sellers, isLoading } = useSellersPagination({
    status: "pending",
    roles: "seller",
    perPage,
  })
  const { products } = useProductsPagination({
    perPage,
  })
  useEffect(() => {
    const updateHeight = () => {
      if (statRef.current) {
        setStatHeight(statRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    <div className="relative p-6 gap-5 flex flex-col grow">
      {isLoading && <Loader />}
      <h1 className="font-bold text-blue-600">Dashboard</h1>
      <div id="stat-messages" className="gap-5 flex w-full">
        <div
          id="stat-applicants"
          ref={statRef}
          className="basis-8/12 gap-5 flex flex-col"
        >
          <div className="gap-5 grid grid-cols-2">
            {stats.map((stat, i) => {
              return (
                <div
                  key={i}
                  className=" p-5 gap-3  montserrat flex flex-col rounded-lg border border-neutral-100 bg-white"
                >
                  <h1 className=" text-fs-16 font-semibold text-gray-700">
                    {stat.title}{" "}
                  </h1>
                  <div className="gap-3 flex">
                    <div className="font-semibold">{stat.prefix}</div>
                    <CountUp
                      className="text-fs-49 font-bold"
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                  </div>
                  <div className="gap-3 flex items-center">
                    {stat.trend == "up" ? (
                      <HiArrowTrendingUp color="green" />
                    ) : (
                      <HiArrowTrendingDown color="red" />
                    )}
                    <h1> {stat.change} vs last month</h1>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col basis-full gap-2   h-full ">
            <h1 className="p-5 text-sm font-semibold montserrat">
              Latest applicants
            </h1>
            <div className="overflow-hidden rounded-lg  bg-white">
              <table className="w-full  border-separate border-spacing-y-4">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers &&
                    sellers.length > 0 &&
                    sellers.map((seller: ISeller, i: number) => (
                      <>
                        <tr
                          key={seller._id}
                          className="text-center border border-b"
                        >
                          <td className="flex justify-center items-center">
                            <div
                              className="size-10 m-5 flex justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                              bg-blue-500 text-white"
                            >
                              {getInitials(seller.name)}
                            </div>
                          </td>
                          <td>{seller.name}</td>
                          <td>{seller.email}</td>
                          <td className="pr-5">
                            {dateFormatter(seller.createdAt, "day")}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          id="messages"
          style={{ maxHeight: `${statHeight}px` }}
          className="relative basis-4/12 flex flex-col overflow-hidden bg-gray-gradient"
        >
          <div className="mr-10 flex justify-between items-center">
            <h1 className="p-5 text-sm font-semibold montserrat">
              Latest messages
            </h1>
            <h1>chats</h1>
          </div>
          <div className="gap-3 px-3 flex flex-col overflow-y-scroll hide-track rounded-thumb ">
            {messages.map((message, i) => {
              return (
                <div
                  key={i}
                  className="p-3 gap-5 flex items-center rounded-lg border border-neutral-100 bg-white "
                >
                  <div
                    id="avatar"
                    className="size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                                          bg-blue-500 text-white"
                  >
                    {getInitials(message.name)}
                  </div>
                  <div className="flex flex-col w-full font-medium max-md:hidden">
                    <div className="flex justify-between">
                      <h1 className="text-fs-16 font-semibold w-[15ch] truncate">
                        {message?.name}
                      </h1>
                      <h1 className="text-fs-10">{message.time}</h1>
                    </div>
                    <h1 className="text-fs-13 w-[15ch] truncate">
                      {message.message}
                    </h1>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <h1 className="p-5 text-sm font-semibold montserrat">Latest products</h1>
      <div className="overflow-hidden rounded-lg bg-white">
        <table className="w-full  border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th>_Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product: IProduct) => (
                <>
                  <tr key={product._id} className="text-center border border-b">
                    <td className="p-5 ">
                      <h1 className="m-auto w-[10ch] text-center truncate">
                        {product._id}
                      </h1>
                    </td>
                    <td>
                      <div className="relative">
                        {product.media &&
                          product.media.map((image, i) => {
                            return (
                              <div
                                style={{ marginLeft: i * 20 }}
                                className={cn(
                                  "rounded-full overflow-hidden border border-blue-500 w-12 h-12",
                                  i > 0 && "absolute left-0 top-0"
                                )}
                              >
                                {image.url ? (
                                  <img
                                    className="w-full h-full object-cover"
                                    src={image.url}
                                    alt=""
                                  />
                                ) : (
                                  <span className="text-gray-400">
                                    No Image
                                  </span>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product?.discount}%</td>
                    <td>{product.stock}</td>
                    <td>20</td>
                    <td>4.5</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SellerDashboard
