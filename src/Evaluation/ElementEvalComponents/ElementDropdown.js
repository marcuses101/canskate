import React, { useState } from "react";
import "./ElementDropdown.css";
import SkaterButton from "./SkaterButton";

export default function SkaterDropdown({ element }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ElementDropdown">
      <header
        className="ElementDropdownHeader"
        onClick={() => setOpen((bool) => !bool)}
      >
        <div>{element?.element}</div>
        <div>
          <i className="fas fa-user-alt"></i> {element?.skaters?.length}
        </div>
      </header>
      {open && (
        <>
          <h5>Select name to mark element as complete</h5>
          <ul>
            {element?.skaters.map((skater) => (
              <SkaterButton
                key={skater.id}
                skater={skater}
                elementId={element.element_id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
