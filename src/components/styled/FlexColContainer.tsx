import { PropsWithChildren } from 'react'
interface IFlexColContainer extends PropsWithChildren {
  className: string
}
function FlexColContainer({className,children}:IFlexColContainer) {
  return (
    <div className={` ${className} mx-auto container flex flex-col `}>
      {children}
    </div>
  )
}

export default FlexColContainer