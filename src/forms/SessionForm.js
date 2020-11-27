import React, { useState } from "react";

export default function SessionForm() {
  // fancy way to create an Array of weekdays
  const days = Array.from({ length: 7 }, (_, index) =>
    new Date(0, 0, index + 1).toLocaleDateString("en-US", { weekday: "long" })
  );
  const dayOptions = days.map((day) => (
    <option value={day} key={day}>
      {day}
    </option>
  ));
  const [startTime, setStartTime] = useState("");
  const [day, setDay] = useState("");
  const [duration, setDuration] = useState(30);
  return (
    <div className="SessionForm">
      <h1>Hello Sessions</h1>
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
      <input type="submit" value="Submit" />
    </div>
  );
}
