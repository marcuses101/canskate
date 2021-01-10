import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Progress from "./Progress";
import Manage from "./Manage";
import ClubList from "./ClubList";
import Eval from "./Eval";
import "./Main.css";
import Distribution from "./Distribution/Distribution";
import Loading from "./Loading";
import Login from "./Login/Login";
import LoginForm from "./Login/LoginForm";
import AddUserForm from "./Login/AddUserForm";
import Home from "./Home";
import Context from "./Context";
import AddClubForm from "./AddClubForm";
import { CLUB_ACTIONS } from "./services/clubReducer";
import { clubAPI } from "./API/clubAPI";
import { SKATER_ACTIONS } from "./services/skaterReducer";

export default function Main({
  loginState = {},
  setLoginState,
  clubList,
  setClubList,
}) {
  const { clubDispatch, skatersDispatch } = useContext(Context);
  // handle login/new user

  if (loginState.loading) {
    return (
      <main className="Main">
        <Loading />
      </main>
    );
  }

  if (!loginState.loggedIn) {
    return (
      <main className="Main">
        <Switch>
          <Route path="/login">
            <LoginForm setLoginState={setLoginState} />
          </Route>
          <Route path="/new-user">
            <AddUserForm setLoginState={setLoginState} />
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
          <main className="Main">
            <AddClubForm setClubList={setClubList} />
          </main>
        </Route>
        <Route path="/">
          <ClubList clubList={clubList} onClick={loadClub} />
        </Route>
      </Switch>
    );
  }

  // display loading screen while club data is loaded

  // main app
  return (
    <main className="Main">
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
