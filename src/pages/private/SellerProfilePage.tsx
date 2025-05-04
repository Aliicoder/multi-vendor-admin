import SellerGeneralInfoForm from "@/components/forms/SellerGeneralInfo"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import SellerAccountForm from "@/components/forms/SellerAccountForm"
import { useGetSellerByIdQuery } from "@/store/apiSlices/userSlice"
import Loader from "@/components/Loaders/Loader"
import { MdArrowBack } from "react-icons/md"
function SellerProfilePage() {
  const { userId } = useParams()
  const {
    data: response,
    isLoading,
    isSuccess,
  } = useGetSellerByIdQuery({ userId })
  const navigate = useNavigate()
  const segments = useLocation().pathname.split("/").filter(Boolean)
  const pathname = segments.slice(0).join("/")
  return (
    <div className="relative gap-5 p-5">
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <div className=" gap-5 flex flex-col ">
          <div
            onClick={() => navigate(-1)}
            className="text-fs-13 flex items-center gap-3 hover:underline cursor-pointer"
          >
            <MdArrowBack />

            {pathname && <span>{pathname}</span>}
          </div>
          <SellerGeneralInfoForm seller={response?.user} />
          <SellerAccountForm seller={response?.user} />
        </div>
      ) : (
        <h1 className="text-gray-500">seller not found</h1>
      )}
    </div>
  )
}

export default SellerProfilePage
