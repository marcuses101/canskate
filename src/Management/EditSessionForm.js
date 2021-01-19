import React, { useState, useContext } from "react";
import { CLUB_ACTIONS } from "../services/clubReducer";
import { sessionAPI } from "../API/sessionAPI";
import { Link, useHistory } from "react-router-dom";
import { groupAPI } from "../API/groupAPI";
import GroupItem from "./GroupItem";
import Context from "../Context";
import { useSessionFromParamId } from "../Hooks/useSessionFromParamId";
import { useSessionGroups } from "../Hooks/useSessionGroups";
import { useGroups } from "../Hooks/useGroups";
import { useToast } from "../Hooks/useToast";
import "./Form.css";

const colorOptions = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Turquoise",
];
// fancy way to create an Array of weekdays
const days = Array.from({ length: 7 }, (_, index) =>
  new Date(0, 0, index + 1).toLocaleDateString("en-US", { weekday: "long" })
);

function setError(obj) {
  return { ...obj, error: true };
}

export default function EditSessionForm() {
  const toast = useToast();
  const { push } = useHistory();
  const session = useSessionFromParamId();
  const sessionGroups = useSessionGroups(session?.id);
  const allGroups = useGroups();
  const [startTime, setStartTime] = useState({
    value: session?.start_time,
    error: false,
  });
  const [day, setDay] = useState({ value: session?.day, error: false });
  const [duration, setDuration] = useState({
    value: session?.duration,
    error: false,
  });
  const [groups, setGroups] = useState({
    value: sessionGroups.map((group) => ({ ...group, action: null })),
    error: false,
  });
  const [nextGroupId, setNextGroupId] = useState(
    Object.values(allGroups).reduce(
      (id, group) => (group.id > id ? group.id : id),
      0
    ) + 1
  );
  const { clubDispatch } = useContext(Context);

  const groupColors = groups.value.map((group) => group.group_color);
  const dayOptions = days.map((day) => (
    <option value={day} key={day}>
      {day}
    </option>
  ));

  if (!Object.entries(session).length) {
    return (
      <>
        <h2 className="heading">Session not found</h2>
        <br />
        <Link to="/manage/session/edit">Go back?</Link>
      </>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const editedSession = {
      id: session.id,
      day: day.value,
      start_time: startTime.value,
      duration: duration.value,
    };
    let valid = true;

    if (!editedSession.day) {
      toast({ message: "ERROR: Please select a day", type: "error" });
      setDay(setError);
      valid = false;
    }
    if (!editedSession.start_time) {
      toast({ message: "ERROR: Please select a start time", type: "error" });
      setStartTime(setError);
      valid = false;
    }
    if (!editedSession.duration) {
      toast({ message: "ERROR: Please select a duration", type: "error" });
      setDuration(setError);
      valid = false;
    }

    if (!valid) return;

    try {
      await sessionAPI.editSession(editedSession);
      toast({ message: "Session updated", type: "success" });
      clubDispatch({ type: CLUB_ACTIONS.EDIT_SESSION, payload: editedSession });
    } catch (error) {
      toast({ message: "Session Server Error", type: "error" });
      return;
    }

    const groupsToDelete = groups.value.filter(
      (group) => group.action === "delete"
    );
    const groupsToCreate = groups.value.filter(
      (group) => group.action === "create"
    );

    // API call to create or delete groups

    try {
      const createGroupPromise = Promise.all(
        groupsToCreate.map(async (group) => {
          return await groupAPI.addGroup({
            group_color: group.group_color,
            session_id: group.session_id,
          });
        })
      );

      const deleteGroupPromise = Promise.all(
        groupsToDelete.map(async (group) => {
          return await groupAPI.deleteGroup(group);
        })
      );

      const [createGroupResponse] = await Promise.all([
        createGroupPromise,
        deleteGroupPromise,
      ]);

      groupsToDelete.forEach((group) => {
        clubDispatch({ type: CLUB_ACTIONS.REMOVE_GROUP, payload: group.id });
        toast({
          message: `${group.group_color} group removed`,
          type: "success",
        });
      });
      createGroupResponse.forEach((group) => {
        const { id, skaters, session_id, group_color } = group;
        const newGroup = { id, skaters, session_id, group_color };
        clubDispatch({ type: CLUB_ACTIONS.ADD_GROUP, payload: newGroup });
        toast({ message: `${group.group_color} group added`, type: "success" });
      });
    } catch (error) {
      toast({ message: "Group Server Error", type: "error" });
      return;
    }

    setGroups((groups) => ({
      ...groups,
      value: groups.value
        .filter(
          (group) => !groupsToDelete.map((gp) => gp.id).includes(group.id)
        )
        .map((group) => ({ ...group, action: null })),
    }));
  }

  function handleSelect(e) {
    const newGroup = {
      id: nextGroupId,
      session_id: session.id,
      group_color: e.target.value,
      action: "create",
      skaters: [],
    };
    setGroups((groups) => ({
      value: [...groups.value, newGroup],
      error: false,
    }));
    setNextGroupId((id) => id + 1);
  }

  function setAction(group) {
    setGroups((groups) => ({
      value: groups.value
        .map((gp) => {
          return gp.id !== group.id
            ? gp
            : gp.action === null
            ? { ...gp, action: "delete" }
            : gp.action === "delete"
            ? { ...gp, action: null }
            : null;
        })
        .filter(Boolean),
      error: false,
    }));
  }

  return (
    <section className="Form">
      <form onSubmit={handleSubmit}>
        <h2 className="heading">Edit Session</h2>
        <label htmlFor="day">Day: </label>
        <select
          id="day"
          name="day"
          value={day.value}
          onChange={(e) => setDay({ value: e.target.value, error: false })}
        >
          {day
            ? dayOptions
            : [
                <option key="placeholder" value="">
                  Select a day
                </option>,
                ...dayOptions,
              ]}
        </select>
        {day.error && (
          <i className="fas fa-exclamation-triangle error-icon"></i>
        )}
        <br />
        <label htmlFor="startTime">Start Time: </label>
        <input
          type="time"
          value={startTime.value}
          onChange={(e) =>
            setStartTime({ value: e.target.value, error: false })
          }
        />{" "}
        {startTime.error && (
          <i className="fas fa-exclamation-triangle error-icon"></i>
        )}
        <br />
        <label htmlFor="">Duration: </label>
        <input
          type="number"
          step="5"
          min="30"
          value={duration.value}
          onChange={(e) => setDuration({ value: e.target.value, error: false })}
        />{" "}
        {duration.error && (
          <i className="fas fa-exclamation-triangle error-icon"></i>
        )}
        <br />
        <label htmlFor="group">Add a group </label>
        <select name="group" id="group" onChange={handleSelect}>
          {[
            <option key="" value={null}>
              Select a color
            </option>,
            ...colorOptions.map((color) =>
              groupColors.includes(color) ? null : (
                <option key={color} value={color}>
                  {color}
                </option>
              )
            ),
          ]}
        </select>{" "}
        {groups.error && (
          <i className="fas fa-exclamation-triangle error-icon"></i>
        )}
        <ul className="groupList">
          {groups.value.map((group) => (
            <GroupItem
              key={group.id}
              color={group.group_color}
              action={group.action}
              setAction={() => setAction(group)}
            />
          ))}
        </ul>
        <input type="submit" value="Submit" />
        <button
          type="button"
          onClick={() => push("/manage/session")}
          className="cancel"
        >
          Cancel
        </button>
      </form>
    </section>
  );
}
