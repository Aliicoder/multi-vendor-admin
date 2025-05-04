import{ PropsWithChildren } from 'react'
interface IGrid extends PropsWithChildren {
  className: string
}
function Grid({className,children}:IGrid) {
  return (
    <div className={` ${className} grid`}>
      {children}
    </div>
  )
}

export default Grid