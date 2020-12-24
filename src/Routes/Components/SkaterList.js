import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useClubSkaters } from "../../Hooks/useClubSkaters";
import "./SkaterList.css";

export default function SkaterList() {
  const [name, setName] = useState("");
  const { path } = useRouteMatch();
  const skaters = useClubSkaters();
  const filteredSkaters = name
    ? skaters.filter((skater) => new RegExp(name, "i").test(skater.fullname))
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
      <h2>Choose a skater:</h2>
      <div className="field">
        <input className='input'
          type="text"
          id='name'
          value={name?name:null}
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
        />
        <label className={name && 'scale'} htmlFor="name">Search name</label>
      </div>
      <ul className="links">{skaterLinks}</ul>
    </div>
  );
}
