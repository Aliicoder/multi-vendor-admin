import { MdClose } from "react-icons/md"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useState } from "react"
import AddCategoryForm from "../forms/AddCategoryForm"
import { ICategoryType } from "@/types/types"
interface IAddAddressPortal {
  addCategory: boolean
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>
  refreshCategories: () => void
}
function AddCategoryPortal({
  addCategory,
  setAddCategory,
  refreshCategories,
}: IAddAddressPortal) {
  const [type, setType] = useState<ICategoryType>("root")
  return (
    <>
      {addCategory && (
        <div
          className="fixed z-50 p-6 top-1/2 left-1/2 w-[350px] flex flex-col gap-5
          -translate-x-1/2 -translate-y-1/2 border rounded-lg bg-white "
        >
          <div
            onClick={() => setAddCategory(false)}
            className=" mb-5 flex justify-end"
          >
            <MdClose className="" />
          </div>
          <Select onValueChange={(value: ICategoryType) => setType(value)}>
            <SelectTrigger className="w-full rounded-lg">
              <SelectValue placeholder="Choose Category level" />
            </SelectTrigger>
            <SelectContent className="montserrat">
              <SelectItem defaultChecked value="parent">
                root
              </SelectItem>
              <SelectItem value="child">child</SelectItem>
            </SelectContent>
          </Select>
          <AddCategoryForm type={type} refreshCategories={refreshCategories} />
        </div>
      )}
    </>
  )
}

export default AddCategoryPortal
