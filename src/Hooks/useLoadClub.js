import { useContext } from "react";
import Context from "../Context";
import { clubAPI } from "../API/clubAPI";
import { CLUB_ACTIONS } from "../services/clubReducer";
import { SKATER_ACTIONS } from "../services/skaterReducer";

export function useLoadClub() {
  const { clubDispatch, skatersDispatch, setLoginState } = useContext(Context);
  return async function (id) {
    setLoginState((state) => ({ ...state, loading: true }));
    const clubObject = await clubAPI.getClubById(id);
    const { skatersWithLogs } = clubObject;
    clubDispatch({ type: CLUB_ACTIONS.LOAD_CLUB, payload: clubObject });
    skatersDispatch({
      type: SKATER_ACTIONS.LOAD_SKATERS,
      payload: skatersWithLogs,
    });
    setLoginState((state) => ({ ...state, loading: false, clubLoaded: true }));
  };
}
