import { PropsWithChildren } from 'react'
interface IBlock extends PropsWithChildren {
  className: string
}
function Block({className,children}:IBlock) {
  return (
    <div className={` ${className} `}>
      {children}
    </div>
  )
}

export default Block