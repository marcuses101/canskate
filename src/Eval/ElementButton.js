import React, { useState, useContext } from "react";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import {useLogElement} from '../Hooks/useLogElement'
import { SKATER_ACTIONS } from "../services/skaterReducer";
import Context from "../Context";

export default function ElementButton({ element }) {
  const skater = useSkaterFromParamId();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const logElement = useLogElement(skater.id, element.element_id)

  return (
    <div
      className="ElementButton"
      onClick={() => setConfirmOpen((bool) => !bool)}
    >
      <div>{element.element}</div>
      {confirmOpen ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            logElement();
          }}
        >
          ✓
        </button>
      ) : null}
    </div>
  );
}
