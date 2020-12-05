import React, { useContext } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Context from "../Context";

export default function GroupEvalList() {
  const { url } = useRouteMatch();
  const { id } = useParams();
  const sessionId = parseInt(id);
  const {
    club: { sessions },
  } = useContext(Context);
  console.log(sessions);
  const { groups } = sessions.find((session) => session.id === sessionId);
  console.log(groups);
  if (!groups.length)
    return (
      <div className="GroupEvalList">
        <h4>No associated group</h4>
        <Link to={`/manage/session/edit/${id}`}>Add a group?</Link>
      </div>
    );
  return (
    <div className="GroupEvalList">
      <ul>
        {groups.map((group) => {
          return (
            <li key={group.id}>
              <Link to={`${url}/group/${group.id}`}>{group.group_color}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
