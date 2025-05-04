import { useFetchCategoriesChunkQuery } from "@/store/apiSlices/categorySlice";
import { useEffect, useState } from "react";
import { ICounter } from "@/types/types";
interface ICategoriesPagination {
  name: string;
  perPage?: number;
  sort?: Object;
  level?: number;
}
const useCategoriesPagination = ({
  name,
  perPage,
  level,
}: ICategoriesPagination) => {
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  });
  const { data: response, isLoading } = useFetchCategoriesChunkQuery(
    { name, level, curPage: counter.curPage, perPage },
    {
      skip: name.length < 1,
    }
  );
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen });
  }, [isLoading]);
  return { categories: response?.categories, isLoading };
};
export default useCategoriesPagination;
