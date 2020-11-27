import React, { useState } from "react";

export default function ElementButton({ name,element_id, logElement }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <div className="ElementButton" onClick={() => setConfirmOpen((bool) => !bool)}>
      <div>{name}</div>
      {confirmOpen ? <button onClick={(e)=>{
        e.stopPropagation();
        logElement(element_id)}}>✓</button> : null}
    </div>
  );
}
