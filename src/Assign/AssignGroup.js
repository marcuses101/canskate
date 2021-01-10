import React, { useState } from "react";
import AssignSkater from "./AssignSkater";
import "./AssignGroup.css";

export default function AssignGroup({
  name = "",
  group_id,
  skaters,
  otherGroups,
  text,
}) {
  const [open, setOpen] = useState(false);
  return (
    <li
      style={{ background: `var(--${name.toLowerCase()})` }}
      className="AssignGroup"
    >
      <div
        style={{ color: text }}
        className="groupName"
        onClick={() => setOpen((bool) => !bool)}
      >
        {name}
      </div>
      {open && (
        <ul>
          {skaters.map((skater) => (
            <AssignSkater
              key={skater.id}
              skater={skater}
              group_id={group_id}
              otherGroups={otherGroups}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
