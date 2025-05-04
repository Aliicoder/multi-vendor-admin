import useSquircle from '@/hooks/useSquircle'
import { Squircle } from 'corner-smoothing'
import { PropsWithChildren } from 'react'
interface Styles extends PropsWithChildren {
  className?: string
  onClick?:() => void
}
function Border({className,onClick,children}:Styles) {
  const cornerRadius = useSquircle()
  return (
      <div onClick={onClick} className='drop-shadow-sm' >
        <Squircle cornerRadius={cornerRadius} className={className}>
          {children}
        </Squircle>
      </div>
  )
}

export default Border