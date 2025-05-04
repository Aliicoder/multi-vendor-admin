import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import SelectSvg from "./svgs/selectSvg"
interface SelectionProps {
  title: string
  defaultOption: string
  options: string[]
  setOption: React.Dispatch<React.SetStateAction<any>>
}
function Selection({
  title,
  defaultOption,
  options,
  setOption,
}: SelectionProps) {
  const [clicked, setClicked] = useState(false)
  const selectionRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const handleOptionClick = (option: string) => {
    setOption(option)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectionRef.current &&
        !selectionRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setClicked(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <button
      type="button"
      role="combobox"
      aria-expanded="false"
      onClick={() => setClicked((prev) => !prev)}
      className={cn(
        "relative py-2 px-3 gap-3  flex items-center h-9 text-sm shadow-sm rounded-md border bg-white border-neutral-200  ring-offset-white"
      )}
    >
      <h1 className="text-blue-500">{title}</h1>
      <h1 className=" text-gray-700 ">{defaultOption}</h1>
      <SelectSvg />
      {clicked && (
        <div
          ref={popupRef}
          className="absolute z-10 mt-2 left-0 top-full flex flex-col items-start
          w-full text-sm shadow-sm rounded-md bg-white border border-gray-300"
        >
          {options.map((option, i) => {
            return (
              <div key={i} className="group p-1 w-full ">
                <div
                  onClick={() => handleOptionClick(option)}
                  className="p-1 px-2 flex justify-start rounded-md group-hover:bg-gray-100 "
                >
                  {option} {title}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </button>
  )
}

export default Selection
