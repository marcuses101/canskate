import React from "react";
import "./ClubList.css";
import { Link } from "react-router-dom";

export default function ClubList({ clubList, onClick }) {
  const clubListItems = clubList.map(({ name, id }) => (
    <li onClick={() => onClick(id)} key={id}>
      {name}
    </li>
  ));

  if (!clubList.length) {
    return (
      <main className="ClubList Main">
        <h2>No Clubs associated with this account</h2><br/>
        <Link to="/club/add">Create a club?</Link>
      </main>
    );
  }

  return (
    <main className="ClubList Main">
      <h2>Choose a club:</h2>
      <ul>{clubListItems}</ul>
    </main>
  );
}
