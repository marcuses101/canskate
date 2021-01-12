import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useClubSkaters } from "../Hooks/useClubSkaters";
import "./SkaterList.css";

export default function SkaterList() {
  const [name, setName] = useState("");
  const { path } = useRouteMatch();
  const skaters = useClubSkaters().sort((a, b) =>
    a.fullname > b.fullname ? 1 : -1
  );

  if (!skaters.length) {
    return (
      <div className="SkaterList">
        <h2 className="header" style={{ backgroundColor: "var(--red-light)" }}>
          No skaters found
        </h2>
        <br />
        <Link to="/manage/skater/add">Add skater?</Link>
      </div>
    );
  }

  const filteredSkaters = name
    ? skaters.filter((skater) =>
        skater.fullname.toLowerCase().includes(name.toLowerCase())
      )
    : skaters;

  const skaterLinks = filteredSkaters.map((skater) => {
    return (
      <li key={skater.id}>
        <Link to={`${path}/${skater.id}`}>{skater.fullname}</Link>
      </li>
    );
  });
  return (
    <div className="SkaterList">
      <h2 className="header">Choose a skater:</h2>
      <div className="field">
        <input
          className="input"
          type="text"
          id="name"
          value={name ? name : ""}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        <label className={name && "scale"} htmlFor="name">
          Search name
        </label>
      </div>
      {skaterLinks.length ? (
        <ul className="links">{skaterLinks}</ul>
      ) : (
        <>
          <p>
            <b>No skaters found matching search term</b>
          </p>
          <Link to="/manage/skater/add">Add skater?</Link>
        </>
      )}
    </div>
  );
}
