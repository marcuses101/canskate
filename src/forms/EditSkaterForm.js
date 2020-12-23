import React, { useContext, useState } from "react";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import dayjs from "dayjs";
import Context from "../Context";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import { CLUB_ACTIONS } from "../services/clubReducer";
import {useHistory, useParams} from 'react-router-dom'
import TextInput from "./Components/TextInput";
import DateInput from "./Components/DateInput";
import RadioSelector from "./Components/RadioSelector";
import SessionSelector from "./Components/SessionSelector";
import { useToast } from "../Hooks/useToast";

export default function EditSkaterForm() {
  const {url} = useParams();
  const {push} = useHistory();
  const toast = useToast();
  const skater = useSkaterFromParamId();
  const {
    skatersDispatch,
    clubDispatch,
    club: { sessions },
  } = useContext(Context);
  const [fullName, setFullName] = useState({
    value: skater.fullname,
    error: false,
  });
  const [birthdate, setBirthdate] = useState({
    value: dayjs(skater.birthdate).format("YYYY-MM-DD"),
    error: false,
  });
  console.log({ sessions });
  const [gender, setGender] = useState({ value: skater.gender, error: false });

  // set selectedSession No CLUB_ACTIONS will be taken on submit for sessions with action:null
  const [selectedSessions, setSelectedSessions] = useState({
    value: Object.entries(sessions)
      .map(([id, session]) =>
        session.skaters.includes(skater.id)
          ? { ...session, action: null }
          : null
      )
      .filter(Boolean),
    error: false,
  });
  function handleSubmit(e) {
    e.preventDefault();
    const editedSkater = {
      id: skater.id,
      fullname: fullName,
      gender: gender,
      birthdate: birthdate,
    };
    skatersDispatch({
      type: SKATER_ACTIONS.EDIT_SKATER,
      payload: editedSkater,
    });
  }

  function addSession(sessionId) {
    setSelectedSessions((selectedSessions) => ({
      value: [
        ...selectedSessions.value,
        { ...sessions[sessionId], action: "add" },
      ],
      error: false,
    }));
  }

  function removeSession(sessionId) {
    console.log(sessionId);
    setSelectedSessions((sessions) => ({
      ...sessions,
      value: sessions.value.filter(({ id }) => id !== parseInt(sessionId)),
    }));
  }
  function setSessionActionRemove(sessionId) {

    setSelectedSessions((sessions) => ({
      ...sessions,
      value:
        sessions.value.map((session) =>
          session.id === sessionId ? { ...session, action: "remove" } : session
        )

    }));
  }
  function setSessionActionNull(sessionId){
    setSelectedSessions((sessions) => ({
      ...sessions,
      value:
        sessions.value.map((session) =>
          session.id === sessionId ? { ...session, action: null } : session
        )
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const editedSkater = {
      id: skater.id,
      fullname: fullName,
      gender: gender,
      birthdate: birthdate,
    };

    let valid = true;

    console.log(skater.birthdate);
    if (!editedSkater.fullname) {
      setFullName((obj) => ({ ...obj, error: true }));
      toast({ message: `ERROR: Full name field is required`, type: "error" });
      valid = false;
    }
    if (!editedSkater.birthdate) {
      setBirthdate((obj) => ({ ...obj, error: true }));
      toast({ message: `ERROR: Birthdate field is required`, type: "error" });
      valid = false;
    }
    if (!editedSkater.gender) {
      setGender((obj) => ({ ...obj, error: true }));
      toast({ message: `ERROR: Please select a gender`, type: "error" });
      valid = false;
    }
    if (!selectedSessions.value.length) {
      setSelectedSessions(sessions=>({...sessions,error:true}))
      toast({
        message: "ERROR: Please select at least one session",
        type: "error",
      });
      valid = false;
    }

    if (!valid) return;

    skatersDispatch({ type: SKATER_ACTIONS.EDIT_SKATER, payload: skater });
    selectedSessions.value.forEach(session => {
    if (session.action === 'add')  {clubDispatch({
        type: CLUB_ACTIONS.SESSION_ADD_SKATER,
        payload: { session_id: session.id, skater_id: skater.id },
      });
      setSessionActionNull(session.id)
    }
    else if (session.action === 'remove') {
      clubDispatch({
        type: CLUB_ACTIONS.SESSION_REMOVE_SKATER,
        payload: {session_id: session.id, skater_id: skater.id}
      })
      removeSession(session.id)
    }
    });
    
    toast({ message: `${skater.fullname} edited!`, type: "success" });

  }

  return (
    <form className="SkaterForm" onSubmit={handleSubmit}>
      <h2>Edit Skater</h2>
      <TextInput
        id="fullname"
        label="Full Name: "
        value={fullName.value}
        error={fullName.error}
        onChange={(e) => setFullName({ error: false, value: e.target.value })}
      />
      <DateInput
        id="birthdate"
        label="Birthdate: "
        value={birthdate.value}
        error={birthdate.error}
        onChange={(e) => setBirthdate({ error: false, value: e.target.value })}
      />
      <RadioSelector
        name="gender"
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        error={gender.error}
        propValue={gender.value}
        onChange={(e) =>
          setGender(() => ({ error: false, value: e.target.value }))
        }
      />
      <SessionSelector
        selectedSessions={selectedSessions.value}
        addSession={addSession}
        removeSession={removeSession}
        setActionRemove={setSessionActionRemove}
        setActionNull={setSessionActionNull}
        error={selectedSessions.error}
      />

      <input type="submit" value="Submit" />
    </form>
  );
}
