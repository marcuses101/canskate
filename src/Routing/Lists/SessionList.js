import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSessions } from "../../Hooks/useSessions";

export default function SessionList() {
  const sessions = useSessions();
  const { path } = useRouteMatch();

  if (!Object.values(sessions).length) {
    return (
      <div className="SessionList">
        <h2 className="heading" style={{ backgroundColor: "var(--red-light)" }}>
          No sessions found
        </h2>
        <br />
        <Link to="/manage/session/add">Add a session?</Link>
      </div>
    );
  }
  return (
    <div className="SessionList">
      <h2 className="heading">Choose a session:</h2>
      <ul className="links">
        {Object.values(sessions).map((session) => {
          return (
            <li key={session.id}>
              <Link to={`${path}/${session.id}`}>{`${
                session.day
              } ${session.start_time.substring(0, 5)}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
