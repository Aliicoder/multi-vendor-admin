import { RefObject } from "react";

export let trackElementHeight = (reference:RefObject<HTMLDivElement|HTMLFormElement>,property:string) =>{
  if(reference && reference.current ){
    const handleResize = () => {
      if (reference.current?.clientHeight) {
        const height = reference.current.clientHeight;

        console.log(`${property}`,height);
        document.documentElement.style.setProperty(property, `${height}px`);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (reference.current) 
      resizeObserver.observe(reference.current);
    return () => {
      resizeObserver.disconnect();
    }
  }
}