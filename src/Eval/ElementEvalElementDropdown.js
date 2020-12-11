import React, { useState} from "react";
import SkaterEvalButton from "./SkaterEvalButton";
import "./ElementDropdown.css";

export default function ElementEvalElementDropdown({ element, skaters }) {
  const [open, setOpen] = useState(false);
  const skaterItems = skaters.map((skater) => (
    <SkaterEvalButton key={`${skater.id}${element.element_id}`} skater={skater} element={element} />
  ));
  return (
    <li className="ElementDropdown" onClick={() => setOpen((bool) => !bool)}>
      <h4>
        <div>
          <span>{element.element}</span> <span>{skaters.length}</span>
        </div>
      </h4>
      {open && <ul>{skaterItems}</ul>}
    </li>
  );
}
