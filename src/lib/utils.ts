import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
  return name
    .split(" ", 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export const errorToast = (error: any) => {
  toast.error(error.data.message ?? "unknown error occurred")
}

export const successToast = (response: any) => {
  toast.success(response.message)
}
export const placePlaceHolder = (value: string, placeholder: string) => {
  if (value) return
  return { placeholder }
}
