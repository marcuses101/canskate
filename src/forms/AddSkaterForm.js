import React, { useState, useContext } from "react";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import {CLUB_ACTIONS} from '../services/clubReducer'
import Context from "../Context";
import { useToast } from "../Hooks/useToast";

export default function SkaterForm() {
  const {
    skatersDispatch,
    clubDispatch,
    nextSkaterId,
    club: { sessions },
  } = useContext(Context);

  const toast = useToast();

  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);

  console.log(sessions)

  function handleSelect(e) {
    const sessionId = parseInt(e.target.value);
    setSelectedSessions((sessions) => [...sessions, sessionId]);
  }

  function handleRemoveSession(e, sessionId) {
    e.preventDefault();
    setSelectedSessions((sessions) =>
      sessions.filter((id) => id !== parseInt(sessionId))
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit fired')
    const skater = {
      id: nextSkaterId,
      fullname: fullName,
      gender: gender,
      birthdate: birthdate,
    };
    skatersDispatch({ type: SKATER_ACTIONS.ADD_SKATER, payload: skater });
    selectedSessions.forEach(sessionId=>{
      clubDispatch({type: CLUB_ACTIONS.SESSION_ADD_SKATER, payload:{session_id: sessionId,skater_id: skater.id}})
    })
    toast({message: `${skater.fullname} added!`, type:'success'})
    setFullName("");
    setBirthdate("");
    setGender(null);
    setSelectedSessions([])
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
        value="Male"
        checked={gender === "Male"}
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        name="gender"
        id="female"
        value="Female"
        checked={gender === "Female"}
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <label htmlFor="sessions">Choose your session(s):</label>
      <select name="sessions" id="sessions" onChange={handleSelect}>
        {[
          <option key="" value={null}>
            Sessions
          </option>,
          ...Object.values(sessions).map((session) => {
            return selectedSessions.includes(session.id) ? null : (
              <option key={session.id} value={session.id}>
                {`${session.day} ${session.start_time.slice(0, 5)}`}
              </option>
            );
          }),
        ]}
      </select>
      <ul className="selectedSessionsList">
        {selectedSessions.map((sessionId) => {
          const session = sessions[sessionId];
          return (
            <li key={sessionId}>
              <span>
                {`${session.day} ${session.start_time.slice(0, 5)}`}
                <button onClick={(e) => handleRemoveSession(e, sessionId)}>
                  Remove Session
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
