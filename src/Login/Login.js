import React from "react";
import { Link, useHistory } from "react-router-dom";
import Welcome from "../Main/Welcome";
import "./Login.css";
import { userAPI } from "../API/userAPI";
import { useToast } from "../Hooks/useToast";

export default function Login({ setLoginState, setAppUsername }) {
  const toast = useToast();
  const { push } = useHistory();
  async function demoLogin() {
    try {
      const username = "demo";
      const jwt = await userAPI.submitLogin({
        username: "demo",
        password: "password",
      });
      localStorage.setItem("jwt", JSON.stringify(jwt));
      localStorage.setItem("username", JSON.stringify("demo"));
      toast({ message: "Login successful", type: "success" });
      setLoginState((state) => ({ ...state, loggedIn: true }));
      setAppUsername(username);
      push("/");
    } catch (error) {
      toast({ message: "Server Error", type: "error" });
      console.error(error);
    }
  }
  return (
    <div className="Login">
      <Welcome />
      <button className="link" onClick={demoLogin}>
        Try a demo
      </button>
      <h2 className="heading">Login</h2>
      <Link to="/login">Login</Link>
      <Link to="/new-user">New user</Link>
    </div>
  );
}
