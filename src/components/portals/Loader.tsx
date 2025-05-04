import ReactDOM from "react-dom";
import { BarLoader } from "react-spinners"
const overrideCss : React.CSSProperties = {
  position: "absolute",
  height: "2px",
  top: "0",
  left : "0" ,
  width: "100%",
}
type ConditionParams = {
  isLoading: boolean
}
const absoluteConditionalLoader = ({isLoading}:ConditionParams) => {
  
  const portalElement = document.getElementById("portals");
  if (!portalElement) {
    return null; 
  }

  return ReactDOM.createPortal(
   <>
      {
        isLoading && 
        <div className="absolute top-0 w-full">
          <BarLoader cssOverride={overrideCss}/>
        </div>
      }
   </> ,
    portalElement
  )
}
 
export default absoluteConditionalLoader;