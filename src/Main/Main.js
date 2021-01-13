import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Main.css";

import Loading from "./Loading";
import PrimaryRouter from "../Routing/PrimaryRouter";
import ClubRouter from "../Routing/ClubRouter";
import LoginRouter from "../Routing/LoginRouter";

export default function Main({
  loginState = {},
  setLoginState,
  clubList,
  setClubList,
  setUsername,
  loadClub,
}) {
  // handle login/new user
  const ref = useRef();
  const { pathname } = useLocation();

  // scroll to top of page on path change
  useEffect(() => {
    ref?.current?.scrollTo(0, 0);
  }, [pathname]);

  if (loginState.loading) {
    return (
      <main className="Main" ref={ref}>
        <Loading />
      </main>
    );
  }

  //handle login/ user creation
  if (!loginState.loggedIn) {
    return (
      <main className="Main" ref={ref}>
        <LoginRouter setLoginState={setLoginState} setUsername={setUsername} />
      </main>
    );
  }

  // choose a club to manage
  if (!loginState.clubLoaded) {
    return (
      <main className="Main" ref={ref}>
        <ClubRouter
          setClubList={setClubList}
          clubList={clubList}
          loadClub={loadClub}
        />
      </main>
    );
  }

  // main app
  return (
    <main className="Main" ref={ref}>
      <PrimaryRouter />
    </main>
  );
}
