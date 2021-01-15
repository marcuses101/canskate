import React from "react";
import AssignGroup from "./AssignGroup";
import { useClubSkaters } from "../../Hooks/useClubSkaters";
import { Link } from "react-router-dom";
import { useSessionFromParamId } from "../../Hooks/useSessionFromParamId";
import { useSessionGroups } from "../../Hooks/useSessionGroups";
import './AssignSkatersToGroups.css'

export default function AssignSkatersToGroups() {
  const session = useSessionFromParamId();
  const groups = useSessionGroups(session.id);
  const assignedSkaters = groups.map((group) => group.skaters).flat();
  const sessionSkaters = useClubSkaters()
    .filter((skater) => session.skaters.includes(skater.id))
    .sort((a, b) => (a.fullname > b.fullname ? 1 : -1));
  const unassignedSkaters = sessionSkaters.filter(
    (skater) => !assignedSkaters.includes(skater.id)
  );
  const groupComponents = groups.map((group) => {
    const groupSkaters = sessionSkaters.filter((skater) =>
      group.skaters.includes(skater.id)
    );
    return (
      <AssignGroup
        key={group.id}
        text="white"
        name={group.group_color}
        group_id={group.id}
        skaters={groupSkaters}
        otherGroups={groups.filter((g) => g.id !== group.id)}
      />
    );
  });
  return (
    <>
      <h2 className="heading">Assign Skaters to groups</h2>
      <section className='groupArticles'>
        {!!unassignedSkaters.length && (
          <AssignGroup
            key="unassigned"
            text="black"
            name="Unassigned Skaters"
            skaters={unassignedSkaters}
            otherGroups={groups}
          />
        )}
        {groups.length ? (
          groupComponents
        ) : (
          <>
            <div>No groups associated with this session</div>
            <Link to={`/manage/session/edit/${session.id}`}>Add a group?</Link>
          </>
        )}
      </section>
    </>
  );
}
