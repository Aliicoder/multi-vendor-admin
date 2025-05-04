import { PropsWithChildren, useRef, useState } from 'react'
interface Slider extends PropsWithChildren{
  className: string;
}
function Slider({children,className}:Slider) {
  const [draggable,setDraggable] = useState(false)
  const [initialMousePosition,setInitialMousePosition] = useState(0)
  const [scrollPosition,setScrollPosition] = useState(0)
  const sliderRef = useRef(null)
  const handleMouseDown = (e:any) =>{
    setDraggable(true)
    setInitialMousePosition(e.clientX)
    setScrollPosition(sliderRef.current.scrollLeft)
  }
  const handleMouseMove = (e:any) =>{
    if(draggable){
      const mousePosition = e.clientX 
      const difference = mousePosition - initialMousePosition
      sliderRef.current.scrollLeft = scrollPosition - difference
    }
  }
  const handleMouseUp = (e:any) => {
    setDraggable(false)
  }
  const handleMouseLeave = (e:any) => {
    setDraggable(false)
  }
  return (
    <div
      style={{ userSelect: draggable ? 'none' : 'auto'}}
      className={`${className} ${draggable ? "":"snap-x snap-mandatory"} `}  
      ref={sliderRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}

export default Slider