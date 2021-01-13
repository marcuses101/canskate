import React, { useState } from "react";
import TextInput from "../FormComponents/TextInput";
import PasswordInput from "../FormComponents/PasswordInput";
import { useToast } from "../Hooks/useToast";
import { userAPI } from "../API/userAPI";
import "./AddUserForm.css";
import { useHistory } from "react-router-dom";

export default function AddUserForm({ setLoginState , setAppUsername }) {
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const toast = useToast();

  function validateForm() {
    let valid = true;
    if (!username) {
      valid = false;
      setUsernameError(true);
      toast({ message: "username required", type: "error" });
    }
    if (!password) {
      valid = false;
      setPasswordError(true);
      toast({ message: "password required", type: "error" });
    }
    if (!repeatPassword) {
      valid = false;
      setRepeatPasswordError(true);
      toast({ message: "password required", type: "error" });
    }
    if (password !== repeatPassword) {
      valid = false;
      setPasswordError(true);
      setRepeatPasswordError(true);
      toast({ message: "Password inputs must match", type: "error" });
    }

    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await userAPI.addUser({ username, password});
      const jwt = await userAPI.submitLogin({ username, password });
      localStorage.setItem("jwt", JSON.stringify(jwt));
      localStorage.setItem('username', JSON.stringify(username))
      setLoginState((state) => ({ ...state, loggedIn: true }));
      setAppUsername('username')
      push("/");
    } catch (error) {
      console.error(error);
      toast({ message: "Server Error", type: "error" });
    }
  }
  return (
    <div className="AddUserForm">
      <form onSubmit={handleSubmit}>
        <h2 className="heading">Create New User</h2>
        <TextInput
          label="Username"
          max='15'
          id="username"
          value={username}
          error={usernameError}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError(false);
          }}
        />
        <PasswordInput
          label="Password"
          id="password"
          value={password}
          error={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
        />
        <PasswordInput
          label="Repeat password"
          id="repeatRassword"
          value={repeatPassword}
          error={repeatPasswordError}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            setRepeatPasswordError(false);
          }}
        />
        <input type="submit" value="Create New User" />
        <button className='cancel' onClick={()=>push('/')}>Cancel</button>
      </form>
    </div>
  );
}
