import { useContext } from "react";
import Context from "../Context";

export function useRibbonById() {
  const { ribbons } = useContext(Context);
  return function (ribbonId) {
    return ribbons.find((ribbon) => {
      return ribbon.id === ribbonId;
    });
  };
}
