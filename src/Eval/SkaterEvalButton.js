import React from "react";
import { useLogElement } from "../Hooks/useLogElement";
export default function SkaterEvalButton({ skater, element }) {
  const logElement = useLogElement(skater.id, element.element_id);
  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        logElement();
      }}
      className="SkaterEvalButton"
    >
      {skater.fullname}
    </li>
  );
}
