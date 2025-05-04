import { useFetchSearchedProductsMutation } from '@/store/Reducers/productApiSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
const useMainSearch = () =>{
  const [searchValue,setSearchValue] = useState("")
  const [category,setCategory] = useState("")
  const [searchedProducts,setSearchedProducts] = useState([])
  const [fetchSearchedProductsMutation] = useFetchSearchedProductsMutation()
  const searchProducts = async ({searchValue,category}:{searchValue:string,category:string}) =>{
    try {
      const response = await fetchSearchedProductsMutation({
        searchValue,
        category
      }).unwrap();console.log("response >>",response)
      setSearchedProducts(response.products)
    } catch (error:any) { console.log(error)
      toast.error(error?.data.message ?? "try again later")
    }
  }
  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    searchProducts({searchValue: e.target.value,category})
    setSearchValue(e.target.value)
  }
  const handleCategoryChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
     searchProducts({searchValue,category:e.target.value})
     setCategory(e.target.value)
  }
  return {searchedProducts,handleCategoryChange,handleSearchChange}
}
export default useMainSearch