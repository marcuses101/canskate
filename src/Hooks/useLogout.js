import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "../Context";
import { CLUB_ACTIONS } from "../services/clubReducer";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import { useToast } from "./useToast";

export function useLogout() {
  const {
    clubDispatch,
    skatersDispatch,
    setLoginState,
    setClubList,
    setUsername,
  } = useContext(Context);
  const toast = useToast();
  const { push } = useHistory();
  return function () {
    localStorage.clear();
    clubDispatch({ type: CLUB_ACTIONS.LOGOUT });
    skatersDispatch({ type: SKATER_ACTIONS.LOGOUT });
    setClubList([]);
    setUsername("");
    setLoginState({
      loggedIn: false,
      loading: false,
      clubLoaded: false,
    });
    toast({ message: "Logout successful", type: "success" });
    push("/");
  };
}
