import React, { useState, useContext } from "react";
import { skaterGroupAPI } from "../../API/skaterGroupAPI";
import { useParams } from "react-router-dom";
import Context from "../../Context";
import { useToast } from "../../Hooks/useToast";
import { CLUB_ACTIONS } from "../../services/clubReducer";
import "./AssignSkater.css";
export default function AssignSkater({ skater = {}, group_id, otherGroups }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const { clubDispatch } = useContext(Context);
  const { session_id } = useParams();
  async function groupTransfer(
    skater_id,
    session_id,
    initialGroupId,
    targetGroupId
  ) {
    try {
      // await groupChange(skater_id, targetGroupId)
      if (initialGroupId) {
        await skaterGroupAPI.changeGroup(
          skater_id,
          initialGroupId,
          targetGroupId
        );
      } else {
        await skaterGroupAPI.addSkaterToGroup(skater_id, targetGroupId);
      }
      initialGroupId &&
        clubDispatch({
          type: CLUB_ACTIONS.GROUP_REMOVE_SKATER,
          payload: { skater_id, session_id, group_id: initialGroupId },
        });
      targetGroupId &&
        clubDispatch({
          type: CLUB_ACTIONS.GROUP_ADD_SKATER,
          payload: { skater_id, session_id, group_id: targetGroupId },
        });
    } catch (error) {
      console.error(error);
      toast({ message: "Server Error", type: "error" });
    }
  }

  return (
    <li className="AssignSkater" >
      <div className='skater' onClick={() => setOpen((bool) => !bool)}>
        {skater.fullname}
        {open ? (
          <i className="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </div>
      {open && (<>
        <h6>Move to:</h6>
        <ul className="otherGroups">
          {otherGroups.map((group) => (
            <li
              style={{ background: group.group_color }}
              key={"" + skater.id + group.id}
              onClick={() => {
                groupTransfer(
                  skater.id,
                  parseInt(session_id),
                  group_id,
                  group.id
                );
              }}
            >
              {group.group_color}
            </li>
          ))}
        </ul>
      </>)}
    </li>
  );
}
