import { BarLoader } from "react-spinners"
const overrideCss: React.CSSProperties = {
  position: "absolute",
  height: "2px",
  top: "0",
  left: "0",
  width: "100%",
}

const Loader = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <BarLoader cssOverride={overrideCss} />
      </div>
    </>
  )
}
export default Loader
