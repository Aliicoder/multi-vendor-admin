import{ PropsWithChildren } from 'react'
interface IFlexRow extends PropsWithChildren {
  className: string
}
function FlexRow({className,children}:IFlexRow) {
  return (
    <div className={` ${className} flex flex-row`}>
      {children}
    </div>
  )
}

export default FlexRow