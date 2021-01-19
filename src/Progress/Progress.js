import React from "react";
import { Link } from "react-router-dom";

export default function Progress() {
  return (
    <div className="Progress">
      <ul className="links">
        <li>
          <Link to={`progress/skater`}>All Skaters</Link>
        </li>
      </ul>
    </div>
  );
}
