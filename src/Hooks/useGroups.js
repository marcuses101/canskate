import { useContext } from "react";
import Context from "../Context";

export function useGroups() {
  return useContext(Context).club.groups || {};
}
