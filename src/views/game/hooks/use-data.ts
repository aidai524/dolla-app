import { useContext } from "react";
import { HomeContext } from "../context";

export default function useData() {
  const context = useContext(HomeContext);

  return context;
}
