import { CategoriesContext } from "@/Context/CategoriesContext";
import { useContext } from "react";

export function useCategories () {
  return useContext(CategoriesContext)
}