import { ICounter, ISellerStatus, Role } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { useGetPaginatedSellersQuery } from "@/store/apiSlices/userSlice";
interface ISellerPagination {
  name?: string;
  sellerStatus: ISellerStatus;
  roles?: Role;
  perPage: number;
  sort?: [];
}
const useSellersPagination = ({
  name,
  sellerStatus,
  roles,
  perPage,
  sort,
}: ISellerPagination) => {
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  });
  const {
    data: response,
    isLoading,
    refetch: refetchUsers,
  } = useGetPaginatedSellersQuery({
    name,
    sellerStatus,
    roles,
    curPage: counter.curPage,
    perPage,
    sort,
  });

  const handleLeft = useCallback(() => {
    if (counter.prev > 0)
      setCounter({
        ...counter,
        prev: counter.prev - 1,
        curPage: counter.curPage - 1,
        next: counter.next - 1,
      });
  }, [counter]);
  const handleRight = useCallback(() => {
    if (counter.next <= counter.pagesLen)
      setCounter({
        ...counter,
        prev: counter.prev + 1,
        curPage: counter.curPage + 1,
        next: counter.next + 1,
      });
  }, [counter]);
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen });
  }, [isLoading]);
  return {
    sellers: response?.sellers,
    counter,
    handleLeft,
    handleRight,
    refetchUsers,
    isLoading,
  };
};
export default useSellersPagination;
