import React, { useContext } from "react";
import ElementEval from './ElementEval'
import Context from "../Context";
import { useParams } from "react-router-dom";

export default function GroupEval() {
  const {
    club: { sessions },
    skaters,
  } = useContext(Context);
  const { session_id, group_id } = useParams();
  const session = sessions.find(
    (session) => session.id === parseInt(session_id)
  );
  const group = session.groups.find((group) => group.id === parseInt(group_id));
  const groupSkaters = skaters.filter((skater) =>
    group.skater_ids.includes(skater.id)
  );

  return <ElementEval skaters={groupSkaters}/>;
}
