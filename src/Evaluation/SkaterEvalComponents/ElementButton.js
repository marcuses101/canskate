import React from "react";
import useSkaterFromParamId from "../../Hooks/useSkaterFromParamId";
import { useLogElement } from "../../Hooks/useLogElement";
import "./ElementButton.css";

export default function ElementButton({ element = {}, style }) {
  const skater = useSkaterFromParamId();
  const logElement = useLogElement(skater.id, element.element_id);

  return (
    <li
      className="ElementButton"
      onClick={async (e) => {
        e.stopPropagation();
        await logElement();
      }}
      style={style}
    >
      <div>{element.element}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          logElement();
        }}
      >
        ✓
      </button>
    </li>
  );
}
