import { FilterContext } from "@/Context/FilterProductsContext";
import { useContext } from "react";

export function useFilter () {
  return useContext(FilterContext)
}