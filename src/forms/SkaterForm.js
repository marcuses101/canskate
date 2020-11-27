import React, { useState } from "react";
import { SKATER_ACTIONS } from "../services/SkaterReducer";

export default function SkaterForm({dispatch}) {
  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState(null);
  function handleSubmit(e){
    e.preventDefault();
    console.log('submitting')
    const skater = {
      fullname: fullName,
      gender: gender,
      birthdate:birthdate,
    }
    dispatch({type: SKATER_ACTIONS.ADD_SKATER, payload:skater});
    setFullName('')
    setBirthdate('');
    setGender(null);
  }

  return (
    <form className="SkaterForm" onSubmit={handleSubmit}>
      <label htmlFor="fullname">Full Name:</label>
      <input
        type="text"
        id="fullname"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <br />
      <label htmlFor="birthdate">Birthdate:</label>
      <input
        type="date"
        id="birthdate"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <br />
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        name="gender"
        id="male"
        value="male"
        checked={gender === "male"}
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        name="gender"
        id="female"
        value="female"
        checked={gender === "female"}
        onChange={(e)=>setGender(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit"/>
    </form>
  );
}
