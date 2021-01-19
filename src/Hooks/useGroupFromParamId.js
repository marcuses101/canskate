import { useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context";

export function useGroupFromParamId() {
  const {
    club: { groups = [] },
  } = useContext(Context);
  const { group_id } = useParams();
  return groups[group_id] || {};
}
