import { PropsWithChildren } from 'react'
interface IFlexRowContainer extends PropsWithChildren {
  className: string
}
function FlexRowContainer({className,children}:IFlexRowContainer) {
  return (
    <div className={` ${className} container flex flex-row `}>
      {children}
    </div>
  )
}

export default FlexRowContainer