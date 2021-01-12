import React, { useState, useContext } from "react";
import { skaterAPI } from "../API/skaterAPI";
import { skaterClubAPI } from "../API/skaterClubAPI";
import { skaterSessionAPI } from "../API/skaterSessionAPI";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import { CLUB_ACTIONS } from "../services/clubReducer";
import TextInput from "../FormComponents/TextInput";
import DateInput from "../FormComponents/DateInput";
import RadioSelector from "../FormComponents/RadioSelector";
import SessionSelector from "../FormComponents/SessionSelector";
import Context from "../Context";
import { useToast } from "../Hooks/useToast";
import { useHistory } from "react-router-dom";

export default function SkaterForm() {
  const {
    skatersDispatch,
    clubDispatch,
    club: { sessions, id: club_id },
  } = useContext(Context);
  const {push} = useHistory()
  const toast = useToast();

  const [fullName, setFullName] = useState({ value: "", error: false });
  const [birthdate, setBirthdate] = useState({ value: "", error: false });
  const [gender, setGender] = useState({ value: "", error: false });
  const [selectedSessions, setSelectedSessions] = useState({
    value: [],
    error: false,
  });

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
    setSelectedSessions((sessions) => ({
      ...sessions,
      value: sessions.value.filter(({ id }) => id !== parseInt(sessionId)),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const skater = {
      fullname: fullName.value,
      gender: gender.value,
      birthdate: birthdate.value,
    };

    let valid = true;

    if (!skater.fullname) {
      setFullName((obj) => ({ ...obj, error: true }));
      toast({ message: `ERROR: Full name field is required`, type: "error" });
      valid = false;
    }
    if (!skater.birthdate) {
      setBirthdate((obj) => ({ ...obj, error: true }));
      toast({ message: `ERROR: Birthdate field is required`, type: "error" });
      valid = false;
    }
    if (!skater.gender) {
      setGender((obj) => ({ ...obj, error: true }));
      toast({ message: `ERROR: Please select a gender`, type: "error" });
      valid = false;
    }
    if (!selectedSessions.value.length) {
      setSelectedSessions((sessions) => ({ ...sessions, error: true }));
      toast({
        message: "ERROR: Please select at least one session",
        type: "error",
      });
      valid = false;
    }

    if (!valid) return;

    try {
      const serverSkater = await skaterAPI.addSkater(skater);
      await skaterClubAPI.addSkaterToClub(serverSkater.id, club_id);
      skatersDispatch({
        type: SKATER_ACTIONS.ADD_SKATER,
        payload: serverSkater,
      });
      await Promise.all(
        selectedSessions.value.map(async (session) => {
          await skaterSessionAPI.addSkaterToSession(
            serverSkater.id,
            session.id
          );
          clubDispatch({
            type: CLUB_ACTIONS.SESSION_ADD_SKATER,
            payload: { session_id: session.id, skater_id: serverSkater.id },
          });
        })
      );
    } catch (error) {
      toast({ message: "Server Error", type: "error" });
      return;
    }

    toast({ message: `${skater.fullname} added!`, type: "success" });
    setFullName({ value: "", error: false });
    setBirthdate({ value: "", error: false });
    setGender({ value: "", error: false });
    setSelectedSessions({ value: [], error: false });
  }

  return (
    <form className="SkaterForm" onSubmit={handleSubmit}>
      <h2 className='header'>New Skater</h2>
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
        error={selectedSessions.error}
      />
      <input type="submit" value="Submit" />
      <button type='button' className='cancel' onClick={()=>push('/manage/skater')}>Cancel</button>

    </form>
  );
}
