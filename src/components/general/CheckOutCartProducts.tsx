import { selectCart } from "@/store/Reducers/cartReducer"
import { productRating } from "@/utils/helpers/rating"
import { useSelector } from "react-redux"

function CheckOutCartProducts() {
  const { activeCart } = useSelector(selectCart)

  return (
     <>
        {
          activeCart.units && activeCart.units.length == 0 ?
          <div>no products in the cart yet</div>
          :
          activeCart.units&&activeCart.units.map((product:any,i)=> (
          <div key={i} className="flex basis-3/12 gap-3 rounded-md bg-white overflow-hidden border hover:shadow-md transition-all">
            <div className="basis-1/4 shrink-0 flex justify-center items-center  overflow-hidden">
              <img className="object-contain " src={product.productId?.media[0]?.url} alt="" />
            </div>
            <div className="flex flex-col justify-center gap-3 pl-6">
                <h1 className=" font-medium">{product.productName}</h1>
                <p className="c2 ">{product.productId?.description}</p>
                <div className=" flex gap-1 c2">{productRating(3)}</div>
                <div className="w-full h-[1px] bg-slate-100"/>
                <h1 className="c2">{product.productId.shopName}</h1>
            </div>
            <div className="flex ml-auto flex-col justify-between gap-2 p-6 ">
              <a className="c2 hover:underline text-center text-blue-500" href="">show more</a>
            </div>
          </div>
          ))
        }
     </>
  )
}

export default CheckOutCartProducts