import React, {useState, useContext} from "react";
import { CLUB_ACTIONS } from "../services/clubReducer";
import GroupItem from "./GroupItem";
import Context from "../Context";
import { useSessionFromParamId } from "../Hooks/useSessionFromParamId";
import { useSessionGroups } from "../Hooks/useSessionGroups";
import { useGroups } from "../Hooks/useGroups";

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

export default function EditSessionForm() {
  const session = useSessionFromParamId();
  const sessionGroups = useSessionGroups(session.id);
  const allGroups = useGroups();
  const [startTime, setStartTime] = useState(session.start_time);
  const [day, setDay] = useState(session.day);
  const [duration, setDuration] = useState(session.duration);
  const [groups, setGroups] = useState(
    sessionGroups.map((group) => ({ ...group, action: null }))
  );
  const [nextGroupId, setNextGroupId] = useState(
    Object.values(allGroups).reduce(
      (id, group) => (group.id > id ? group.id : id),
      0
    ) + 1
  );
  const groupColors = groups.map((group) => group.group_color);
  const { clubDispatch } = useContext(Context);

  const dayOptions = days.map((day) => (
    <option value={day} key={day}>
      {day}
    </option>
  ));

  function handleSubmit(e) {
    e.preventDefault();

    const newSession = {
      id: session.id,
      day,
      start_time: startTime,
      duration,
      skaters: [],
    };
    clubDispatch({ type: CLUB_ACTIONS.ADD_SESSION, payload: newSession });

    const groupsToDelete = groups.filter((group) => group.action === "delete");
    const groupsToCreate = groups.filter((group) => group.action === "create");
    console.log({ groupsToDelete });
    groupsToDelete.forEach((group) =>
      clubDispatch({ type: CLUB_ACTIONS.REMOVE_GROUP, payload: group.id })
    );
    groupsToCreate.forEach((group) =>
      {const {id,skaters,session_id,group_color} = group
      const newGroup = {id,skaters,session_id,group_color}
      clubDispatch({ type: CLUB_ACTIONS.ADD_GROUP, payload: newGroup })}
    );
    setGroups((groups) =>
      groups.filter(
        (group) => !groupsToDelete.map((gp) => gp.id).includes(group.id)
      ).map(group=>({...group, action:null}))
    );
  }

  function handleSelect(e) {
    const newGroup = {
      id: nextGroupId,
      session_id: session.id,
      group_color: e.target.value,
      action: "create",
      skaters:[]
    };
    setGroups((groups) => [...groups, newGroup]);
    setNextGroupId(id=>id+1)
  }

  function handleRemove(group) {
    setGroups((groups) =>
      groups
        .map((gp) => {
          return gp.id !== group.id
            ? gp
            : gp.action === null
            ? { ...gp, action: "delete" }
            : null;
        })
        .filter(Boolean)
    );
  }

  function handleUnremove(group) {
    setGroups((groups) =>
      groups.map((gp) => {
        return gp.id !== group.id ? gp : { ...gp, action: null };
      })
    );
  }
  return (
    <div className="SessionForm">
      <h1>Hello Sessions</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="day">Day: </label>
        <select
          id="day"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
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
        <br />
        <label htmlFor="startTime">Start Time: </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <br />
        <label htmlFor="">Duration: </label>
        <input
          type="number"
          step="5"
          min="30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <br />
        <label htmlFor="group">Add a group</label>
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
        </select>
        <ul className="groupList">
          {groups.map((group, i) => (
            <GroupItem
              key={group.id}
              color={group.group_color}
              action={group.action}
              unremove={() => handleUnremove(group)}
              remove={() => handleRemove(group)}
            />
          ))}
        </ul>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
