import React, { useState, useReducer, useEffect } from "react";
import config from "./config";
import { useHistory, useLocation } from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Context from "./Context";
import { clubAPI } from "./API/clubAPI";
import { skatersReducer, SKATER_ACTIONS } from "./services/skaterReducer";
import { clubReducer, CLUB_ACTIONS } from "./services/clubReducer";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";
import "./App.css";
import { useToast } from "./Hooks/useToast";

export default function App() {
  const toast = useToast();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loginState, setLoginState] = useState({
    loggedIn: localStorage.getItem("jwt") ? true : false,
    loading: false,
    clubLoaded: false,
  });
  const [isDemo, setIsDemo] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [club, clubDispatch] = useReducer(clubReducer, {});
  const [skaters, skatersDispatch] = useReducer(skatersReducer, []);

  // close filter on route change. change header color
  useEffect(() => {
    setIsFilterOpen(false);
    document.documentElement.style.setProperty(
      "--header-color",
      Math.random() > 0.5 ? "var(--blue-light)" : "var(--green)"
    );
  }, [pathname]);

  // wake up server
  useEffect(() => {
    (async () => await fetch(config.PING))();
  }, []);

  //load club data
  useEffect(() => {
    (async () => {
      if (loginState.loggedIn) {
        setLoginState((state) => ({ ...state, loading: true }));
        const clubs = await clubAPI.getClubs();
        setClubList(clubs);
        setLoginState((state) => ({ ...state, loading: false }));
      }
    })();
  }, [loginState.loggedIn]);

  function logout() {
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
  }

  function clubLogout() {
    clubDispatch({ type: CLUB_ACTIONS.LOGOUT });
    skatersDispatch({ type: SKATER_ACTIONS.LOGOUT });
    setLoginState({
      loggedIn: true,
      loading: false,
      clubLoaded: false,
    });
  }

  async function loadClub(id) {
    setLoginState((state) => ({ ...state, loading: true }));
    const clubObject = await clubAPI.getClubById(id);
    const { skatersWithLogs } = clubObject;
    clubDispatch({ type: CLUB_ACTIONS.LOAD_CLUB, payload: clubObject });
    skatersDispatch({
      type: SKATER_ACTIONS.LOAD_SKATERS,
      payload: skatersWithLogs,
    });
    setLoginState((state) => ({ ...state, loading: false, clubLoaded: true }));
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
        <SideNav
          username={username}
          open={isNavOpen}
          closeNav={closeNav}
          logout={logout}
          clubLogout={clubLogout}
          clubLoaded={loginState.clubLoaded}
        />
        {/* prevent clicking/scrolling while sidenav open */}
        {isNavOpen && (
          <div
            style={{
              zIndex: "1",
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: "0",
            }}
          ></div>
        )}

        <Header
          loggedIn={loginState.loggedIn}
          openNav={openNav}
          clubLoaded={loginState.clubLoaded}
        />

        <Main
          setUsername={setUsername}
          loginState={loginState}
          setLoginState={setLoginState}
          clubList={clubList}
          setClubList={setClubList}
          loadClub={loadClub}
        />
      </div>
    </Context.Provider>
  );
}
