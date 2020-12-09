import React, { useState, useContext } from "react";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import Context from "../Context";
import "./ElementDropdown.css";

export default function ElementEvalElementDropdown({ element, skaters }) {
  const [open, setOpen] = useState(false);
  const { skatersDispatch } = useContext(Context);
  const skaterItems = skaters.map((skater) => (
    <li
      onClick={(e) => {
        e.stopPropagation();
        skatersDispatch({
          type: SKATER_ACTIONS.COMPLETE_ELEMENT,
          payload: { skater_id: skater.id, element_id: element.element_id },
        });
      }}
      key={`${element.id}${skater.id}`}
    >
      {skater.fullname}
    </li>
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
