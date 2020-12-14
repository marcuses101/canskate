import React, { useState, useContext } from "react";
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
  const [startTime, setStartTime] = useState("");
  const [day, setDay] = useState("");
  const [duration, setDuration] = useState(30);
  const [groupColors, setGroupColors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const session_id =
      Object.values(club.sessions).reduce(
        (id, session) => (id < session.id ? session.id : id),
        0
      ) + 1;
    const group_id = Object.values(club.groups).reduce((id, group) => {
      return group.id>id?group.id:id;
    }, 0);
    groupColors.forEach((groupColor, i) => {
      const group = {
      id: group_id + i + 1,
      group_color: groupColor,
      session_id,
      skaters: [],
      }
      clubDispatch({type:CLUB_ACTIONS.ADD_GROUP,payload:group})
    })

    const session = {
      id: session_id,
      day,
      start_time: startTime,
      duration,
      skaters: [],
    };
    clubDispatch({ type: CLUB_ACTIONS.ADD_SESSION, payload: session });
    toast({message:`${day} ${startTime} session created!`,type:'success'})
    setDay('')
    setStartTime('')
    setDuration(30)
    setGroupColors([])
  }

  function handleSelect(e) {
    const changeColor = e.target.value;
    setGroupColors((currentArray) => {
      return [changeColor, ...currentArray];
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
          {groupColors.map((group, i) => (
            <li key={`${i}${group}`}>
              <span>{group}</span>
              <button
                onClick={() => {
                  setGroupColors((arr) =>
                    arr.filter((color) => color !== group)
                  );
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
