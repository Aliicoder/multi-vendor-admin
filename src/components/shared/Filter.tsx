import { useCategories } from "@/hooks/useCategories";
import { useFetchCategoriesMutation } from "@/store/Reducers/categoryApiSlice";
import { useFetchFilteredProductsMutation } from "@/store/Reducers/productApiSlice";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { Checkbox } from "../ui/checkbox";
import { BsStarHalf } from "react-icons/bs";
import { Input } from "../ui/input";
import IconButton from "../buttons/IconButton";
import { useFilter } from "@/hooks/useFilter";
interface MinMax {
  min: number;
  max: number;
}
function Filter() {
  const {categories,setCategories} = useCategories();
  const [fetchCategoriesMutation] = useFetchCategoriesMutation();
  const [minMax,setMinMax] = useState<MinMax|undefined>({min:0,max:10000000});
  const {setFilter} = useFilter()
  const [checkedRating,setCheckedRating] = useState<number|undefined>()
  const [checkedCategory,setCheckedCategory] = useState<string|undefined>()
  const productRating = (num:number) => {
    const rating = Array.from({length:5}).map(_=>{
      let starType = <GoStar className="text-yellow-500" />
      if(num > 0){
          if (num >= 1 )
            starType = <GoStarFill className="text-yellow-500" />
          else
            starType = <BsStarHalf className="text-yellow-500" />
        num--;
      }
      return starType
    })
    return rating
  }
  const handleCheckedCategories = (category:string) =>{
    setCheckedCategory(prev=> prev == category ? undefined : category)
  }
  const handleRatingChange = (index:number) =>{ console.log(index)
    setCheckedRating(prev => prev == index ? undefined : index)
  }
  const handleMinMaxChange = (e:any) =>{
    setMinMax(prev => ({...prev,[e.target.name]:e.target.value}))
  }
  const handleFilterSubmit = (e:any) =>{
    e.preventDefault()
    const queryParams = {
      minPrice:minMax.min,
      maxPrice:minMax.max,
      rating:checkedRating,
      category:checkedCategory
    }
    setFilter(prev=>({...prev,queryParams}))
  }
  useEffect(() => {
    if(categories.length <= 0 ){
      const fetchCategoriesProducts = async () =>{
        const response = await fetchCategoriesMutation({}).unwrap(); console.log("response >>",response)
        setCategories(response?.categories);
      }
      fetchCategoriesProducts()
    }
  },[]);
  return (
    <>
      <form onSubmit={handleFilterSubmit} action="" className='z-10'>
        <div className="">
          <h1 className="font-semibold">Categories</h1>
          <ul className="pl-3 py-3">
            {
              categories&&categories.map(category => (
                <li className="flex justify-between py-1">
                  <label
                    htmlFor="terms"
                    className="pl-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category?.name}
                  </label>
                  <Checkbox checked={category?.name == checkedCategory}  onClick={()=>handleCheckedCategories(category?.name)} value={category?.name} id="terms" />     
                </li>
              ))
            }
          </ul>
        </div>
        <div>
          <h1 className="font-semibold">Price range</h1>
          <div className="flex gap-3 p-4">
            <Input onChange={handleMinMaxChange} name="min" type="text" placeholder="min" />
            <div className="flex justify-center items-center">to</div>
            <Input onChange={handleMinMaxChange} name="max" type="text" placeholder="max" />
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Rating</h1>
          <div className="flex gap-3 pl-3 py-3">
            <ul className="flex flex-col-reverse w-full gap-1" >
              { 
                Array.from({length: 6}).map((_,index) => 
                <li className="flex justify-between  ">
                    <label
                      htmlFor="terms"
                      className="pl-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    <span className="flex"> {productRating(index)} </span>
                    </label>
                    <Checkbox checked={index == checkedRating} onClick={()=>handleRatingChange(index)}  value={index} id="terms" />   
                </li>
                )             
              }
            </ul>
          </div>
        </div>
        <div className="flex justify-end pt-3">
          <IconButton  className="cp-x-2_7 cp-y-1_4 font-semibold bg-transparent text-[var(--text-color)] hover:text-white" 
            text="Apply" direction={"right"}>
          
          </IconButton>
        </div>
      </form>
    </>
  )
}

export default Filter