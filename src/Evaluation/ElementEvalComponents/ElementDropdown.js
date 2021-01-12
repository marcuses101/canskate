import React, { useState } from "react";
import "./ElementDropdown.css";
import SkaterButton from './SkaterButton'

export default function SkaterDropdown({ element }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ElementDropdown">
      <header className='ElementDropdownHeader' onClick={() => setOpen((bool) => !bool)}>
        <div>{element?.element}</div>
        <div>{element?.skaters?.length}</div>
      </header>
      {open && (
        <ul>
          {element?.skaters.map((skater) => (
            <SkaterButton key={skater.id} skater={skater} elementId={element.element_id}/>
          ))}
        </ul>
      )}
    </div>
  );
}
