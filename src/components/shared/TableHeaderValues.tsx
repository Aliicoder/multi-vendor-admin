interface TableHeaderValuesParams{
  values: string[]
}
function TableHeaderValues({values}:TableHeaderValuesParams) { console.log("TableHeaderValues rendered ...")
  return (
    <tr className=" c3 ">
      {
        values.map(header=><th className="cp-10">{header}</th>)
      }
    </tr>
  )
}

export default TableHeaderValues