import { GoStar, GoStarFill } from "react-icons/go";

export const productRating = (num:number) => {
  const rating = Array.from({length:5}).map((_,i)=>{
    let starType = <GoStar key={i} className="text-yellow-500" />
    if(num > 0){
        starType = <GoStarFill key={i}  className="text-yellow-500" />
      num--;
    }
    return starType
  })
  return rating
}