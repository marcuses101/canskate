import React, { useRef } from "react";
import { useSessions } from "../../Hooks/useSessions";

export default function SessionSelector({
  selectedSessions = [],
  addSession,
  removeSession,
  setActionRemove,
  setActionNull,
  error,
}) {
  const sessions = useSessions();
  const select = useRef(null);

  return (
    <div className="SessionSelector">
      <label htmlFor="sessions">Choose your session(s):</label>
      <select ref={select} name="sessions" id="sessions">
        {[
          <option key="" defaultValue value="">
            Sessions
          </option>,
          ...Object.values(sessions)
            .filter((session) => {
              // display only unselected Sessions as select options
              const selectedIds = selectedSessions.map((sesh) => sesh.id);
              return !selectedIds.includes(session.id);
            })
            .map((session) => (
              <option key={session.id} value={session.id}>{`${
                session.day
              } ${session.start_time.slice(0, 5)}`}</option>
            )),
        ]}
      </select>
      {
        <button
          type="button"
          onClick={() => {
            select.current.value && addSession(select.current.value);
          }}
        >
          Add Session
        </button>
      }
      {error && <i class="fas fa-exclamation-triangle error-icon"></i>}
      <ul className="selectedSessionsList">
        {selectedSessions.map((session) => {
          if (session.action === "add") {
            return (
              <li key={session.id}>
                <span>{`Add skater to ${session.day} ${session.start_time.slice(
                  0,
                  5
                )}`}</span>{" "}
                <button type="button" onClick={() => removeSession(session.id)}>
                  Cancel
                </button>
              </li>
            );
          } else if (session.action === "remove") {
            return (
              <li key={session.id}>
                <span>{`Remove skater from ${
                  session.day
                } ${session.start_time.slice(0, 5)}`}</span>{" "}
                <button type="button" onClick={()=>setActionNull(session.id)}>Cancel</button>
              </li>
            );
          } else {
            return (
              <li key={session.id}>
                <span>
                  {`${session.day} ${session.start_time.slice(0, 5)} `}
                  <button
                    type="button"
                    onClick={() => {

                      setActionRemove(session.id);
                    }}
                  >
                    Remove skater from session
                  </button>
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
