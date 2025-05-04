import { CiSearch } from 'react-icons/ci'
import { MdAddToPhotos } from 'react-icons/md'
import LinkButton from '../buttons/LinkButton'
import { memo } from 'react'
interface TableHeaderProps{
  onPerPageChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void
  onSearchChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
}
const TableHeader = memo( function ({onPerPageChange,onSearchChange}:TableHeaderProps) { console.log("TableHeader rendered ...")
  return (
    <div className=" flex justify-between items-start cp-3_10">
    <select onChange={onPerPageChange} className='c2  rounded-md bg-slate-100 cp-5' name="" id="">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <div className='flex relative overflow-hidden  gap-4 ml-10 '>
      <LinkButton  to={`addCategory`} text='Add Category' direction={'left'}>
        <MdAddToPhotos/>
      </LinkButton>
      <div className='relative'>
        <input onChange={onSearchChange} placeholder='Search for category ' 
            className={`max-w-[300px] px-5 py-2 h-full
            c3  rounded-lg bg-slate-100 transition-all  outline-none  `} type="text" />
          <div className="absolute  h-full flex justify-center items-center cp-5 top-0 right-0 bg-slate-100 border-l">
            <CiSearch className="m-1 aspect-square cursor-pointer"/>
          </div>
      </div>
    </div>
  </div>
  )
}) 

export default TableHeader