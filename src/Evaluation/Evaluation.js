import React from "react";
import { Link } from "react-router-dom";

export default function Evaluation() {
  return (
    <div className="Evaluation">
      <h2 className="heading">What would you like to evaluate?</h2>
      <ul className="links">
        <li>
          <Link to="/eval/skater">Skater</Link>
        </li>
        <li>
          <Link to="/eval/element">Club</Link>
        </li>
        <li>
          <Link to="/eval/session">Group</Link>
        </li>
      </ul>
    </div>
  );
}
