import React from "react";
import { Link } from "react-router-dom";

export default function ManageSkater() {
  return (
    <div className="ManageSkater">
      <h2 className="heading">What would you like to do?</h2>
      <ul className="links">
        <li>
          <Link to='/manage/skater/add'>Add Skater</Link>
        </li>
        <li>
          <Link to='/manage/skater/edit'>Edit Skater</Link>
        </li>
      </ul>
    </div>
  );
}
