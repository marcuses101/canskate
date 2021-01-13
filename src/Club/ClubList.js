import React from "react";
import "./ClubList.css";
import { Link } from "react-router-dom";

export default function ClubList({ clubList = [], onClick }) {



  const clubListItems = clubList.map(({ name, id }) => (
    <li onClick={() => onClick(id)} key={id}>
      {name}
    </li>
  ));

  if (!clubList.length) {
    return (
      <div className="ClubList">
        <h2 className="heading">No Clubs associated with this account</h2>
        <br />
        <Link to="/club/add">Create a club?</Link>
      </div>
    );
  }

  return (
    <div className="ClubList">
      <h2 className="heading">Choose a club:</h2>
      <ul>{clubListItems}</ul>
      <h2 className="heading">Create new club:</h2>
      <br />
      <Link to="/club/add">New Club</Link>
    </div>
  );
}
