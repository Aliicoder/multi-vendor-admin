import { PropsWithChildren } from 'react'
interface IFlexCol extends PropsWithChildren {
  className?: string
  onClick?: any
}
function FlexCol({className,children,onClick}:IFlexCol) {
  return (
    <div className={` ${className} flex flex-col`} onClick={onClick}>
      {children}
    </div>
  )
}

export default FlexCol