import React from "react";
import { Link } from "react-router-dom";
import Welcome from "../Welcome";
import "./Login.css";

export default function Login() {
  return (
    <div className="Login">
      <Welcome />
      <h2>Login</h2>
      <Link to="/login">Login</Link>
      <Link to="/new-user">New user</Link>
    </div>
  );
}
