import React from "react";
import "./GroupItem.css";

export default function GroupItem({ color, action, setAction }) {
  if (action === "create") {
    return (
      <li className="GroupItem">
        Create {color} group{" "}
        <button type="button" onClick={setAction}>
          Cancel
        </button>
      </li>
    );
  }

  if (action === "delete") {
    return (
      <li className="GroupItem">
        Remove {color} group{" "}
        <button type="button" onClick={setAction}>
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="GroupItem">
      <span>{color} </span>
      <button type="button" onClick={setAction}>
        X
      </button>
    </li>
  );
}
