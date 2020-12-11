import React from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { useSessionGroups } from "../Hooks/useSessionGroups";

export default function GroupList() {
  const { url } = useRouteMatch();
  const { session_id } = useParams();
  const groups = useSessionGroups(session_id);
  if (!groups.length)
    return (
      <div className="GroupEvalList">
        <h4>No associated group</h4>
        <Link to={`/manage/session/edit/${session_id}`}>Add a group?</Link>
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
