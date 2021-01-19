import React from "react";
import { Link } from "react-router-dom";
import { useLoadClub } from "../Hooks/useLoadClub";

export default function ClubList({ clubList = [] }) {
  const loadClub = useLoadClub();
  const clubListItems = clubList.map(({ name, id }) => (
    <li onClick={() => loadClub(id)} key={id}>
      <button className="link">{name}</button>
    </li>
  ));

  if (!clubList.length) {
    return (
      <div className="ClubList">
        <h2 className="heading error">No Clubs associated with this account</h2>
        <Link to="/club/add">Create a club?</Link>
      </div>
    );
  }

  return (
    <div className="ClubList">
      <h2 className="heading">Choose a club:</h2>
      <ul>{clubListItems}</ul>
      <h2 className="heading">Create new club:</h2>
      <Link to="/club/add">New Club</Link>
    </div>
  );
}
