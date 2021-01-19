import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function ManageSession() {
  const { path } = useRouteMatch();

  return (
    <div className="ManageSession">
      <h2 className="heading">What would you like to do?</h2>
      <ul className="links">
        <li>
          <Link to={`${path}/add`}>Add Session</Link>
        </li>
        <li>
          <Link to={`${path}/edit`}>Edit Session</Link>
        </li>
        <li>
          <Link to={`${path}/assign`}>Assign Skaters to Groups</Link>
        </li>
      </ul>
    </div>
  );
}
