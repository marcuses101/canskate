import React, { useState, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "./config";
import SideNav from "./SideNav/SideNav";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Context from "./Context";
import { clubAPI } from "./API/clubAPI";
import { skatersReducer } from "./services/skaterReducer";
import { clubReducer } from "./services/clubReducer";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";

export default function App() {
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [club, clubDispatch] = useReducer(clubReducer, {});
  const [skaters, skatersDispatch] = useReducer(skatersReducer, []);

  // close filter on route change. change headings color for fun
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

  //load club data. void
  useEffect(() => {
    void (async () => {
      if (loginState.loggedIn) {
        setLoginState((state) => ({ ...state, loading: true }));
        const clubs = await clubAPI.getClubs();
        setClubList(clubs);
        setLoginState((state) => ({ ...state, loading: false }));
      }
    })();
  }, [loginState.loggedIn]);

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
    setIsNavOpen,
    setLoginState,
    setClubList,
    setUsername,
  };

  return (
    <Context.Provider value={contextObj}>
      <div className="App">
        <SideNav
          username={username}
          open={isNavOpen}
          closeNav={() => setIsNavOpen(false)}
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
          clubLoaded={loginState.clubLoaded}
        />

        <Main
          setUsername={setUsername}
          loginState={loginState}
          setLoginState={setLoginState}
          clubList={clubList}
          setClubList={setClubList}
        />
      </div>
    </Context.Provider>
  );
}
