import React from "react";

export default function GroupItem({ color, action, remove, unremove }) {
  return (
    <li className="GroupItem">
      {action==='create'?<span>New </span>:null}
      <span>{color} </span>
      {action === "delete" ? (
        <>
          <span>To be deleted</span>
          <button onClick={unremove}>Undo</button>
        </>
      ) : (
        <button onClick={remove}>X</button>
      )}
    </li>
  );
}
