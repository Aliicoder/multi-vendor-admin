import { selectCart } from "@/store/Reducers/cartReducer"
import { useSelector } from "react-redux"

function CartSummery() {
  const { activeCart } = useSelector(selectCart)
  return (
    <div className="flex flex-col p-6 gap-3 bg-white border rounded-md">
      <h1 className="font-semibold">CheckOut</h1>
      <p className="c2"><span className="font-semibold">{activeCart.numberOfProducts}</span> items in the cart</p>
      <h1 className="flex justify-between"><span className="font-semibold">products amount</span> {activeCart.totalAmount}$</h1>
      <h1 className="flex justify-between"><span className="font-semibold">delivery amount</span> 6$</h1>
      <h1 className="flex justify-between"><span className="font-semibold">total</span> {activeCart.totalAmount + 6}$</h1>
    </div>
  )
}

export default CartSummery