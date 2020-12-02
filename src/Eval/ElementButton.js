import React, { useState, useContext } from "react";
import useSkaterFromParamId from '../Hooks/useSkaterFromParamId'
import {SKATER_ACTIONS} from '../services/SkaterReducer'
import Context from '../Context'

export default function ElementButton({ name ,element_id}) {
  const {skatersDispatch} = useContext(Context)
  const {id: skater_id} = useSkaterFromParamId();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function logElement(element_id,skater_id) {
    skatersDispatch({
      type: SKATER_ACTIONS.COMPLETE_ELEMENT,
      payload: { skater_id, element_id },
    });
  }
  return (
    <div className="ElementButton" onClick={() => setConfirmOpen((bool) => !bool)}>
      <div>{name}</div>
      {confirmOpen ? <button onClick={(e)=>{
        e.stopPropagation();
        logElement(element_id,skater_id)}}>✓</button> : null}
    </div>
  );
}
