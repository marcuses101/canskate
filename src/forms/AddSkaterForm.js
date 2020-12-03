import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom'
import { SKATER_ACTIONS } from "../services/SkaterReducer";
import Context from '../Context'

export default function SkaterForm() {
  const {skatersDispatch, nextSkaterId} = useContext(Context)
  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState(null);
  const history = useHistory();
  function handleSubmit(e){
    e.preventDefault();
    const skater = {
      id: nextSkaterId,
      fullname: fullName,
      gender: gender,
      birthdate:birthdate,
    }
    skatersDispatch({type: SKATER_ACTIONS.ADD_SKATER, payload:skater});
    setFullName('')
    setBirthdate('');
    setGender(null);
    history.push(`/eval/skater/${nextSkaterId}`)
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
