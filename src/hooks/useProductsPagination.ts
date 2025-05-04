import { useCallback, useEffect, useState } from "react"
import { useGetPaginatedProductsQuery } from "@/store/apiSlices/productSlice"
import { ICounter } from "@/types/types"
interface IProductsPagination {
  name?: string
  sellerId?: string
  perPage?: number
  category?: string
  outOfStock?: boolean
  sort?: []
}
const useProductsPagination = ({
  name,
  sellerId,
  perPage,
  sort,
}: IProductsPagination) => {
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  })
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetPaginatedProductsQuery({
    name,
    sellerId,
    curPage: counter.curPage,
    perPage,
    sort,
  })
  const handleLeft = useCallback(() => {
    if (counter.prev > 0)
      setCounter({
        ...counter,
        prev: counter.prev - 1,
        curPage: counter.curPage - 1,
        next: counter.next - 1,
      })
  }, [counter])
  const handleRight = useCallback(() => {
    if (counter.next <= counter.pagesLen)
      setCounter({
        ...counter,
        prev: counter.prev + 1,
        curPage: counter.curPage + 1,
        next: counter.next + 1,
      })
  }, [counter])
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen })
  }, [isLoading])
  return {
    products: response?.products,
    counter,
    handleLeft,
    handleRight,
    isLoading,
    refetch,
  }
}
export default useProductsPagination
