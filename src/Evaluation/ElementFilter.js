import React from "react";
import "./ElementFilter.css";

// filter with render in the .Header div#filter sticky

export default function ElementFilter(props) {
  const {
    toggleBadgeFilter,
    toggleFundamentalFilter,
    badgeFilterState = {},
    fundamentalFilterState = {},
  } = props;
  function handleBadgeClick(event) {
    const badge = event.target.textContent;
    toggleBadgeFilter(badge);
  }
  function handleFundamentalClick(event) {
    const fundamental = event.target.innerHTML;
    toggleFundamentalFilter(fundamental);
  }

  return (
    <div className="filterOptions">
      <ul className="badgeOption">
        <li
          onClick={handleBadgeClick}
          className={`one ${badgeFilterState[1] ? "active" : ""}`}
        >
          <div className="badgeCircle">1</div>
        </li>
        <li
          onClick={handleBadgeClick}
          className={`two ${badgeFilterState[2] ? "active" : ""}`}
        >
          <div className="badgeCircle">2</div>
        </li>
        <li
          onClick={handleBadgeClick}
          className={`three ${badgeFilterState[3] ? "active" : ""}`}
        >
          <div className="badgeCircle">3</div>
        </li>
        <li
          onClick={handleBadgeClick}
          className={`four ${badgeFilterState[4] ? "active" : ""}`}
        >
          <div className="badgeCircle">4</div>
        </li>
        <li
          onClick={handleBadgeClick}
          className={`five ${badgeFilterState[5] ? "active" : ""}`}
        >
          <div className="badgeCircle">5</div>
        </li>
        <li
          onClick={handleBadgeClick}
          className={`six ${badgeFilterState[6] ? "active" : ""}`}
        >
          <div className="badgeCircle">6</div>
        </li>
      </ul>
      <ul>
        <li
          onClick={handleFundamentalClick}
          className={fundamentalFilterState["Balance"] ? "balance" : ""}
        >
          Balance
        </li>
        <li
          onClick={handleFundamentalClick}
          className={fundamentalFilterState["Control"] ? "control" : ""}
        >
          Control
        </li>
        <li
          onClick={handleFundamentalClick}
          className={fundamentalFilterState["Agility"] ? "agility" : ""}
        >
          Agility
        </li>
      </ul>
    </div>
  );
}
