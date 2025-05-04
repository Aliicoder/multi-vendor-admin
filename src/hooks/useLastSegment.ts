import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useSegment = () =>{
  const  { pathname } = useLocation() 
  const [segments,setSegments] = useState<string[]>([])
  let urlSegments = pathname.toLowerCase().split('/');
  useEffect(()=>{ 
     setSegments(urlSegments)
  },[pathname])
  return  segments[segments.length - 1] 
}
export default useSegment
