import React, { useState, useContext } from "react";
import { sessionAPI } from "../API/sessionAPI";
import { groupAPI } from "../API/groupAPI";
import { CLUB_ACTIONS } from "../services/clubReducer";
import Context from "../Context";
import { useToast } from "../Hooks/useToast";

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
const dayOptions = days.map((day) => (
  <option value={day} key={day}>
    {day}
  </option>
));

export default function SessionForm() {
  const toast = useToast();
  const { club, clubDispatch } = useContext(Context);
  const [startTime, setStartTime] = useState({ value: "", error: false });
  const [day, setDay] = useState({ value: "", error: false });
  const [duration, setDuration] = useState({ value: 30, error: false });
  const [groupColors, setGroupColors] = useState({ value: [], error: false });

  function setErrorTrue(obj) {
    return { ...obj, error: true };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const group_id = Object.values(club.groups).reduce((id, group) => {
      return group.id > id ? group.id : id;
    }, 0);
    // validate inputs
    let valid = true;
    if (!day.value) {
      setDay(setErrorTrue);
      toast({ message: "ERROR: Please select a day", type: "error" });
      valid = false;
    }
    if (!startTime.value) {
      setStartTime(setErrorTrue);
      toast({ message: "ERROR: Please select a start time", type: "error" });
      valid = false;
    }
    if (!duration.value) {
      setDuration(setErrorTrue);
      toast({
        message: "ERROR: Please select a session duration",
        type: "error",
      });
      valid = false;
    }
    if (!groupColors.value.length) {
      setGroupColors(setErrorTrue);
      toast({ message: "ERROR: Please add at least one group", type: "error" });
      valid = false;
    }
    // stop submit if form is invalid
    if (!valid) return;

    const session = {
      day: day.value,
      start_time: startTime.value,
      duration: duration.value,
    };
    const responseSession = await sessionAPI.addSession(session);

    if (!responseSession) {
      toast({ message: "Server Error", type: "error" });
      return;
    }

    responseSession.skaters = [];

    let responseGroups = [];
    try{
       responseGroups = await Promise.all(
      groupColors.value.map(async (groupColor) => {
        const responseGroup = await groupAPI.addGroup({
          group_color: groupColor,
          session_id: responseSession.id,
        });
        return responseGroup;
      })
    );
    } catch(error) {
      console.error(error)
      toast({message: 'Group Server Error', type:'error'})
      return
    }

    console.log({responseGroups});

    responseGroups.forEach((group) => {
      group.skaters = []
      clubDispatch({ type: CLUB_ACTIONS.ADD_GROUP, payload: group });
    });

    clubDispatch({ type: CLUB_ACTIONS.ADD_SESSION, payload: responseSession });
    toast({
      message: `${day.value} ${startTime.value} session created!`,
      type: "success",
    });
    setDay({ value: "", error: false });
    setStartTime({ value: "", error: false });
    setDuration({ value: 30, error: false });
    setGroupColors({ value: [], error: false });
  }

  function handleSelect(e) {
    const changeColor = e.target.value;
    setGroupColors((obj) => {
      return { value: [changeColor, ...obj.value], error: false };
    });
  }
  return (
    <div className="SessionForm">
      <h1>Hello Sessions</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="day">Day: </label>
        <select
          id="day"
          name="day"
          value={day.value}
          onChange={(e) => setDay({ value: e.target.value, error: false })}
        >
          {day.value
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
        <label htmlFor="">Duration(min): </label>
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
        <label htmlFor="group">Add a group</label>
        <select name="group" id="group" onChange={handleSelect}>
          {[
            <option key="" value={null}>
              Select a color
            </option>,
            ...colorOptions.map((color) =>
              groupColors.value.includes(color) ? null : (
                <option key={color} value={color}>
                  {color}
                </option>
              )
            ),
          ]}
        </select>{" "}
        {groupColors.error && (
          <i className="fas fa-exclamation-triangle error-icon"></i>
        )}
        <ul className="groupList">
          {groupColors.value.map((group, i) => (
            <li key={`${i}${group}`}>
              <span>{group} </span>
              <button
                onClick={() => {
                  setGroupColors((groups) => ({
                    ...groups,
                    value: groups.value.filter((color) => color !== group),
                  }));
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
