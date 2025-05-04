interface DateSort {
  handleSortChange:(event: React.ChangeEvent<HTMLSelectElement>)=>void

}
function DateSort({handleSortChange}:DateSort) {
  return (
    <select onChange={handleSortChange}  className='c3 py-[1%]' name="createdAt" id="">
      <option selected value="">date sort</option>
      <option value="-createdAt">newest to oldest</option>
      <option value="createdAt">oldest to newest</option>
    </select>
  )
}

export default DateSort