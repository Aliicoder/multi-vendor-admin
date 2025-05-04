import { useCallback } from "react"

interface PerPage {
  className: string;
  perPage: number
  setPerPage: React.Dispatch<React.SetStateAction<number>>
}
function PerPage({className,perPage,setPerPage}:PerPage) {
  const handlePerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>{
    setPerPage( +(e.target.value) )
  },[perPage])
  return (
    <div className={className}>
      <select onChange={handlePerPageChange} className='c3 p-[1%]  rounded-md  ' name="" id="">
        <option value="5">8</option>
        <option value="10">16</option>
      </select>
      <h1 className="text-nowrap font-semibold c3">Per page</h1>
    </div>
  )
}

export default PerPage