import{ PropsWithChildren } from 'react'
interface IFlexRow extends PropsWithChildren {
  className?: string
  onClick?:any
}
function Flex({className,children,onClick}:IFlexRow) {
  return (
    <div className={` ${className} flex `} onClick={onClick}>
      {children}
    </div>
  )
}

export default Flex