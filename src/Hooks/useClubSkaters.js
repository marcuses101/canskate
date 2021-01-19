import { useContext } from "react";
import Context from "../Context";

export function useClubSkaters() {
  const { skaters = [] } = useContext(Context);
  return skaters;
}
