import { LoaderContext } from "@/Context/LoaderContext";
import { useContext } from "react";

export function useLoader () {
  return useContext(LoaderContext)
}