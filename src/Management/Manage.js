import React from "react";
import { Link} from "react-router-dom";

export default function Manage() {
  return (
    <div className="Manage">
      <h2 className="heading">What would you like to manage?</h2>
      <ul className="links">
        <li>
          <Link to={`/manage/skater`}>Manage Skaters</Link>
        </li>
        <li>
          <Link to={`/manage/session`}>Manage Sessions</Link>
        </li>
      </ul>
    </div>
  );
}
