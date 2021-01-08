import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSessionFromParamId } from "../../Hooks/useSessionFromParamId";
import { useSessionGroups } from "../../Hooks/useSessionGroups";

export default function GroupList() {
  const { url } = useRouteMatch();
  const session = useSessionFromParamId();
  const groups = useSessionGroups(session?.id);

// figure out a better solution to return
  if (!session) {
    return (
      <>
        <h2>Session not found</h2><br/>
        <Link to='/'>Go home?</Link>
      </>
    )
  }
  if (!groups.length)
    return (
      <div className="GroupEvalList">
        <h4>No associated group</h4>
       <ul className='links'><li><Link to={`/manage/session/edit/${session.id}`}>Add a group?</Link></li></ul>
      </div>
    );
  return (
    <div className="GroupEvalList">
   <h2>{`${session.day} ${session.start_time.slice(0,5)}`}</h2>
   <br/>
   <h3>Choose a group:</h3>
      <ul className="links">
        {groups.map((group) => {
          return (
            <li key={group.id} >
              <Link style={{backgroundColor:`var(--${group.group_color.toLowerCase()})`,color: 'white', fontWeight:'bold'}} to={`${url}/group/${group.id}`}>{group.group_color}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
