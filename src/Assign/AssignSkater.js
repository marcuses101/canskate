import React, { useState, useContext } from "react";
import {useParams} from 'react-router-dom'
import Context from "../Context";
import { CLUB_ACTIONS } from "../services/clubReducer";
import "./AssignSkater.css"
export default function AssignSkater({ skater,group_id, otherGroups }) {
  const [open, setOpen] = useState(false);
  const { clubDispatch } = useContext(Context);
  const {session_id} = useParams();
  function groupTransfer(skater_id, session_id, initialGroupId, targetGroupId) {
   initialGroupId && clubDispatch({ type: CLUB_ACTIONS.GROUP_REMOVE_SKATER, payload: {skater_id,session_id,group_id:initialGroupId} });
   targetGroupId && clubDispatch({type: CLUB_ACTIONS.GROUP_ADD_SKATER,payload:{skater_id,session_id,group_id:targetGroupId}})
  }

  return (
    <li className="AssignSkater" onClick={() => setOpen((bool) => !bool)}>
      <div>{skater.fullname}</div>
      {open && (
        <ul className='otherGroups'>
          {otherGroups.map((group) => (
            <li
            style={{background:group.group_color}}
            key={"" + skater.id + group.id}
            onClick={()=>{
              groupTransfer(skater.id,parseInt(session_id),group_id,group.id)}}
            >{group.group_color}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
