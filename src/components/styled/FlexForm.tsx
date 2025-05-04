import { PropsWithChildren } from 'react'

interface IFlexForm extends PropsWithChildren {
  className: string
  form:any
  onSubmit:any
}
function FlexForm({className,form,onSubmit,children}:IFlexForm) {
  return (
    <form className={` ${className} flex flex-col`} onSubmit={form.handleSubmit(onSubmit)} >
      { children }
    </form> 
  )
}

export default FlexForm