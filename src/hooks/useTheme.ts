import { ThemeContext } from "@/Context/ThemeContext";
import { useContext } from "react";

export function useTheme () {
  return useContext(ThemeContext)
}