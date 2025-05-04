import { PropsWithChildren, useState , createContext, SetStateAction, Dispatch} from 'react'
interface CategoryContextType {
  categories: [] ;
  setCategories: Dispatch<SetStateAction<[]>>;
}
export const CategoriesContext = createContext<CategoryContextType>({
  categories: [],
  setCategories: () => {}, 
});
interface CategoriesProvider extends PropsWithChildren {}
function CategoriesProvider({children}:CategoriesProvider) {
  const [categories,setCategories] = useState<[]>([]);
  return (
    <CategoriesContext.Provider value={{categories,setCategories}}>
      {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesProvider