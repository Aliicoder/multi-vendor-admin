import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
interface LinkButtonParams extends PropsWithChildren {
  to:string
  text?:string
  direction: "left" | "right"
  className?:string
  onClick?:() => void
}
function LinkButton({children,className,direction,text,to,onClick}:LinkButtonParams) {
  return (
    <Link onClick={onClick} to={to} className={`${className} flex items-center   rounded-md`}>
      {direction == "left" && children}
      {text&&<>{text}</>}
      {direction == "right" && children}  
    </Link>
  )
}

export default LinkButton