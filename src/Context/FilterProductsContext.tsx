import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

interface FilterContextType {
  filter: {} ;
  setFilter: Dispatch<SetStateAction<[]>>;
}
export const FilterContext = createContext<FilterContextType>({
  filter: {},
  setFilter: () => {}, 
});
interface FilterProvider extends PropsWithChildren {}
function FilterProvider({children}:FilterProvider) {
  const [filter,setFilter] = useState<{}>({
    searchValue:"",
    perPage:12,
    curPage:1,
    sortBy:"",
    queryParams:{
      minPrice:0,
      maxPrice:10000000,
    }
  });
  return (
    <FilterContext.Provider value={{filter,setFilter}}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider