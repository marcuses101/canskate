import React, { useState } from "react";
import "./LoginForm.css";
import TextInput from "../forms/Components/TextInput";
import PasswordInput from "../forms/Components/PasswordInput";
import { useToast } from "../Hooks/useToast";
import { userAPI } from "../API/userAPI";
import { useHistory } from "react-router-dom";

export default function LoginForm({setLoginState}) {
  const {push} = useHistory();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [sending,setSending] = useState(false)
  const toast = useToast();

  function validateForm() {
    let valid = true;
    if (!username) {
      valid = false;
      setUsernameError(true);
      toast({ message: "Username required", type: "error" });
    }
    if (!password) {
      valid = false;
      setPasswordError(true);
      toast({ message: "Password required", type: "error" });
    }
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setSending(true)
      const jwt = await userAPI.submitLogin({ username, password });
      localStorage.setItem("jwt", JSON.stringify(jwt));
      toast({ message: "Login successful", type: "success" });
      setSending(false)
      setLoginState(state=>({...state,loggedIn:true}))
      push('/');
    } catch (error) {
      setSending(false)
      toast({message:'Invalid login credentials',type:'error'})
      setUsernameError(true);
      setPasswordError(true);
      console.error(error)
    }
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <h2>Please enter your login info:</h2>
        <TextInput
          label="Username"
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
       {sending?<span style={{display:'flex',height:'34px',justifyContent:'center',alignItems:'center'}}>Awaiting server response</span>:<input type="submit" value="Submit" />}
      </form>
    </div>
  );
}
