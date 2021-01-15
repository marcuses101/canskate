import React, { useState } from "react";
import AssignSkater from "./AssignSkater";
import "./AssignGroup.css";

export default function AssignGroup({
  name = "",
  group_id,
  skaters = [],
  otherGroups,
  text,
}) {
  return (
    <article
      className="AssignGroup"
    >
      <h3
        style={{ color: text, background: `var(--${name.toLowerCase()})` }}
        className="groupName"
      >
        {name} Group<span><i className="fas fa-user-alt"></i> {skaters.length}</span>
      </h3>
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
    </article>
  );
}
