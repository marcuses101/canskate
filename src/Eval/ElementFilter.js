import React from "react";

export default function ElementFilter(props) {
  const {
    toggleBadgeFilter,
    toggleFundamentalFilter,
    badgeFilterState,
    fundamentalFilterState,
  } = props;
  function handleBadgeClick(event) {
    const badge = event.target.innerHTML;
    toggleBadgeFilter(badge);
  }
  function handleFundamentalClick(event) {
    const fundamental = event.target.innerHTML;
    toggleFundamentalFilter(fundamental)
  }

  return (
    <div className="filterOptions">
      <ul className="badgeOption">
        <li onClick={handleBadgeClick} className={badgeFilterState[1]?'active':''}>1</li>
        <li onClick={handleBadgeClick} className={badgeFilterState[2]?'active':''}>2</li>
        <li onClick={handleBadgeClick} className={badgeFilterState[3]?'active':''}>3</li>
        <li onClick={handleBadgeClick} className={badgeFilterState[4]?'active':''}>4</li>
        <li onClick={handleBadgeClick} className={badgeFilterState[5]?'active':''}>5</li>
        <li onClick={handleBadgeClick} className={badgeFilterState[6]?'active':''}>6</li>
      </ul>
      <ul>
        <li onClick={handleFundamentalClick} className={fundamentalFilterState['Balance']?"balance":''}>Balance</li>
        <li onClick={handleFundamentalClick} className={fundamentalFilterState['Control']?"control":''}>Control</li>
        <li onClick={handleFundamentalClick} className={fundamentalFilterState['Agility']?"agility":''}>Agility</li>
      </ul>
    </div>
  );
}
