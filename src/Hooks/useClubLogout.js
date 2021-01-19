import { useContext } from "react";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import { CLUB_ACTIONS } from "../services/clubReducer";
import Context from "../Context";

export function useClubLogout() {
  const { clubDispatch, skatersDispatch, setLoginState } = useContext(Context);
  return function () {
    clubDispatch({ type: CLUB_ACTIONS.LOGOUT });
    skatersDispatch({ type: SKATER_ACTIONS.LOGOUT });
    setLoginState({
      loggedIn: true,
      loading: false,
      clubLoaded: false,
    });
  };
}
