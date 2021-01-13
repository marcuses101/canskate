import React, { useContext, useState } from "react";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import { skaterAPI } from "../API/skaterAPI";
import { skaterSessionAPI } from "../API/skaterSessionAPI";
import dayjs from "dayjs";
import Context from "../Context";
import {Link} from 'react-router-dom'
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import { CLUB_ACTIONS } from "../services/clubReducer";
import TextInput from "../FormComponents/TextInput";
import DateInput from "../FormComponents/DateInput";
import RadioSelector from "../FormComponents/RadioSelector";
import SessionSelector from "../FormComponents/SessionSelector";
import { useToast } from "../Hooks/useToast";
import {useSessions} from '../Hooks/useSessions'
import { useHistory } from "react-router-dom";

export default function EditSkaterForm() {
  const toast = useToast();
  const skater = useSkaterFromParamId();
  const { push } = useHistory();
  const sessions = useSessions();
  const {
    skatersDispatch,
    clubDispatch,
  } = useContext(Context);
  const [fullName, setFullName] = useState({
    value: skater.fullname,
    error: false,
  });
  const [birthdate, setBirthdate] = useState({
    value: dayjs(skater.birthdate).format("YYYY-MM-DD"),
    error: false,
  });
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

  if (!Object.entries(skater).length) {
    return (
      <>
        <h2 className="heading">Skater not found</h2>
        <br />
        <Link to="/manage/skater/edit">Go back?</Link>
      </>
    );
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
    setSelectedSessions((sessions) => ({
      ...sessions,
      value: sessions.value.filter(({ id }) => id !== parseInt(sessionId)),
    }));
  }
  function setSessionActionRemove(sessionId) {
    setSelectedSessions((sessions) => ({
      ...sessions,
      value: sessions.value.map((session) =>
        session.id === sessionId ? { ...session, action: "remove" } : session
      ),
    }));
  }
  function setSessionActionNull(sessionId) {
    setSelectedSessions((sessions) => ({
      ...sessions,
      value: sessions.value.map((session) =>
        session.id === sessionId ? { ...session, action: null } : session
      ),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const editedSkater = {
      id: skater.id,
      fullname: fullName.value,
      gender: gender.value,
      birthdate: birthdate.value,
    };
    let valid = true;

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
      setSelectedSessions((sessions) => ({ ...sessions, error: true }));
      toast({
        message: "ERROR: Please select at least one session",
        type: "error",
      });
      valid = false;
    }

    if (!valid) return;

    try {
      await skaterAPI.editSkater(editedSkater);

      toast({ message: `${editedSkater.fullname} edited!`, type: "success" });

      skatersDispatch({
        type: SKATER_ACTIONS.EDIT_SKATER,
        payload: editedSkater,
      });
      await Promise.all(
        selectedSessions.value.map(async (session) => {
          if (session.action === "add") {
            await skaterSessionAPI.addSkaterToSession(
              editedSkater.id,
              session.id
            );
            clubDispatch({
              type: CLUB_ACTIONS.SESSION_ADD_SKATER,
              payload: { session_id: session.id, skater_id: skater.id },
            });
            setSessionActionNull(session.id);
          } else if (session.action === "remove") {
            await skaterSessionAPI.removeSkaterFromSession(
              editedSkater.id,
              session.id
            );
            clubDispatch({
              type: CLUB_ACTIONS.SESSION_REMOVE_SKATER,
              payload: { session_id: session.id, skater_id: skater.id },
            });
            removeSession(session.id);
          }
        })
      );
    } catch (error) {
      console.error(error);
      toast({ message: "Server Error", type: "error" });
      return;
    }
  }

  return (
    <form className="SkaterForm" onSubmit={handleSubmit}>
      <h2 className="heading">Edit Skater</h2>
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
      <button
        type="button"
        className="cancel"
        onClick={() => push("/manage/skater/edit")}
      >
        Cancel
      </button>
    </form>
  );
}
