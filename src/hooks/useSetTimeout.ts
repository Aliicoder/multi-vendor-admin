import { useRef } from "react";

const useSetTimeout = () =>{
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current as number); 
  }
  const timeouter = (callback:()=>void,delay:number) =>{
    timeoutRef.current = setTimeout(() => {
     callback();
    }, delay);
  }
  return { timeouter }
}
export default useSetTimeout