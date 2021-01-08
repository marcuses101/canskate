import React, { useState, useReducer, useEffect } from "react";
import config from "./config";
import { useLocation } from "react-router-dom";
import SideNav from "./SideNav";
import Header from "./Header";
import Main from "./Main";
import Context from "./Context";
import { clubAPI } from "./API/clubAPI";
import { skatersReducer, SKATER_ACTIONS } from "./services/skaterReducer";
import { clubReducer, CLUB_ACTIONS } from "./services/clubReducer";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";
import "./App.css";
import { useToast } from "./Hooks/useToast";

export default function App() {
  const toast  = useToast();
  const { pathname } = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loginState, setLoginState] = useState({
    loggedIn: localStorage.getItem("jwt") ? true : false,
    loading: false,
    clubLoaded: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [club, clubDispatch] = useReducer(clubReducer, {});
  const [skaters, skatersDispatch] = useReducer(skatersReducer, []);

  // close filter on route change
  useEffect(() => {
    setIsFilterOpen(false);
  }, [pathname]);

  //load club data
  useEffect(() => {
    (async () => {
      if (loginState.loggedIn) {
        const clubs = await clubAPI.getClubs();
        setClubList(clubs);
      }
    })();
  }, [loginState.loggedIn]);

  function logout() {
    localStorage.clear();
    clubDispatch({ type: CLUB_ACTIONS.LOGOUT });
    skatersDispatch({ type: SKATER_ACTIONS.LOGOUT });
    setClubList([])
    setLoginState({
      loggedIn: false,
      loading: false,
      clubLoaded: false,
    });
    toast({message:'Logout successful', type:'success'})
  }

  function closeNav() {
    setIsNavOpen(false);
  }
  function openNav() {
    setIsNavOpen(true);
  }

  const contextObj = {
    elements,
    checkmarks,
    ribbons,
    club,
    clubDispatch,
    skaters,
    skatersDispatch,
    isFilterOpen,
    setIsFilterOpen,
  };
  return (
    <Context.Provider value={contextObj}>
      <div className="App">
        <SideNav open={isNavOpen} closeNav={closeNav} logout={logout} />

        <Header loggedIn={loginState.loggedIn} openNav={openNav} />

        <Main
          loginState={loginState}
          setLoginState={setLoginState}
          clubList={clubList}
          setClubList={setClubList}
        />
      </div>
    </Context.Provider>
  );
}
