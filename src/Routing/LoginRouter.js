import React from "react";
import { Switch, Route } from "react-router-dom";
import AddUserForm from "../Login/AddUserForm";
import LoginForm from "../Login/LoginForm";
import Login from "../Login/Login";
import PageNotFound from "./PageNotFound";

export default function LoginRouter({ setLoginState, setUsername }) {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm setLoginState={setLoginState} setAppUsername={setUsername} />
      </Route>
      <Route path="/new-user">
        <AddUserForm
          setLoginState={setLoginState}
          setAppUsername={setUsername}
        />
      </Route>
      <Route exact path="/" component={Login} />
      <Route>
        <PageNotFound url="/" />
      </Route>
    </Switch>
  );
}
