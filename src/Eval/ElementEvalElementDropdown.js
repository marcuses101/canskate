import React, {useState,useContext} from "react";
import {SKATER_ACTIONS} from '../services/SkaterReducer'
import Context from '../Context'

export default function ElementEvalElementDropdown({element, skaters}) {
  const [open,setOpen] = useState(false);
  const {skatersDispatch} = useContext(Context);
  const skaterItems = skaters.map((skater) => <li
    onClick={()=>{
      skatersDispatch({type: SKATER_ACTIONS.COMPLETE_ELEMENT, payload:{skater_id:skater.id,element_id:element.element_id}})
    }}
   key={`${element.id}${skater.id}`}>{skater.fullname}</li>);
  return (
    <>
      <div onClick={()=>setOpen(bool=>!bool)}><span>{element.element}</span> <span>{skaters.length}</span></div>
      {open && <ul>{skaterItems}</ul>}
    </>
  );
}
