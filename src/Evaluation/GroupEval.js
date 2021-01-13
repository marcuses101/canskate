import React from "react";
import ElementEval from "./ElementEval";
import { Link } from "react-router-dom";
import { useGroupFromParamId } from "../Hooks/useGroupFromParamId";
import { useClubSkaters } from "../Hooks/useClubSkaters";
import { useSessionFromParamId } from "../Hooks/useSessionFromParamId";

export default function GroupEval() {
  const group = useGroupFromParamId();
  const session = useSessionFromParamId();
  const skaters = useClubSkaters();
  if (!group || !session)
    return (
      <>
        <h2 className="heading" style={{ backgroundColor: "var(--red-light)" }}>
          Group not found
        </h2>
        <br />
        <Link to="/">Return Home</Link>
      </>
    );

  const groupSkaters = group.skaters?.map((skaterId) =>
    skaters.find((skater) => skater.id === skaterId)
  );
  return (
    <>
      <h2
        className="heading"
        style={{
          backgroundColor: `var(--${group.group_color?.toLowerCase()})`,
        }}
      >
        {session.day} {session.start_time?.slice(0, 5)} {group.group_color}{" "}
        group
      </h2>
      <ElementEval groupSkaters={groupSkaters} />
    </>
  );
}
