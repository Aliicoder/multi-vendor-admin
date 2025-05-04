interface ISellerState {
  handleStateChange:(event: React.ChangeEvent<HTMLSelectElement>)=>void
}
function SellerState({handleStateChange}:ISellerState) {
  return (
    <select onChange={handleStateChange} className='c3 pr-6 rounded-md ' >
      <option selected  value="active">active state</option>
      <option value="inactive">inactive state</option>
      <option value="pending">pending state</option>
    </select>
  )
}

export default SellerState