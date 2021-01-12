import React, { useContext, useRef, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Progress from "./Progress/Progress";
import Manage from "./Management/Manage";
import ClubList from "./Club/ClubList";
import Eval from "./Evaluation/Eval";
import "./Main.css";
import Distribution from "./Distribution/Distribution";
import Loading from "./Loading";
import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import AddUserForm from "./Login/AddUserForm";
import Home from "./Home";
import Context from "./Context";
import AddClubForm from './Club/AddClubForm';
import { CLUB_ACTIONS } from "./services/clubReducer";
import { clubAPI } from "./API/clubAPI";
import { SKATER_ACTIONS } from "./services/skaterReducer";

export default function Main({
  loginState = {},
  setLoginState,
  clubList,
  setClubList,
  setUsername,
}) {
  const { clubDispatch, skatersDispatch } = useContext(Context);
  // handle login/new user
  const ref = useRef();
  const { pathname } = useLocation();

  // scroll to top of page on path change
  useEffect(() => {
    ref?.current?.scrollTo(0, 0);
  }, [pathname]);

  if (loginState.loading) {
    return (
      <main className="Main">
        <Loading />
      </main>
    );
  }

  if (!loginState.loggedIn) {
    return (
      <main className="Main" ref={ref}>
        <Switch>
          <Route path="/login">
            <LoginForm
              setLoginState={setLoginState}
              setAppUsername={setUsername}
            />
          </Route>
          <Route path="/new-user">
            <AddUserForm
              setLoginState={setLoginState}
              setAppUsername={setUsername}
              ref={ref}
            />
          </Route>
          <Route path="/" component={Login} />
        </Switch>
      </main>
    );
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

  // choose a club to manage
  if (!loginState.clubLoaded) {
    return (
      <Switch>
        <Route path="/club/add">
          <main className="Main" ref={ref}>
            <AddClubForm setClubList={setClubList} />
          </main>
        </Route>
        <Route path="/">
          <ClubList clubList={clubList} onClick={loadClub} ref={ref} />
        </Route>
      </Switch>
    );
  }

  // display loading screen while club data is loaded

  // main app
  return (
    <main className="Main" ref={ref}>
      <Switch>
        <Route path="/progress" component={Progress} />
        <Route path="/manage" component={Manage} />
        <Route path="/eval" component={Eval} />
        <Route path="/distribution" component={Distribution} />
        <Route path="/" component={Home} />
      </Switch>
    </main>
  );
}
