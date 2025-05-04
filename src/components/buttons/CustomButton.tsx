import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"
interface ButtonProps extends PropsWithChildren {
  type?: "submit" | "reset" | "button"
  disabled?: boolean
  className?: string
  theme?: "black" | "white" | "none"
  onClick?: () => void
  form?: string
}
const styles = {
  white: "text-gray-600 border bg-white border-neutral-200 shadow-sm",
  black: "text-white border bg-black border-gray-300 shadow-sm",
  none: "",
}
function CustomButton({
  children,
  className,
  theme = "none",
  disabled = false,
  type,
  onClick,
  form,
}: ButtonProps) {
  return (
    <button
      className={cn("px-3 py-2 rounded-md", styles[theme], className)}
      onClick={onClick}
      form={form}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default CustomButton
