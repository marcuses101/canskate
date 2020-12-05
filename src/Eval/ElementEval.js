import React, { useState, useContext, useEffect } from "react";
import ElementEvalList from "../ElementEvalList";
import ElementFilter from "./ElementFilter";
import Context from "../Context";
import "./ElementEval.css";

const fundamentalOptions = {
  Balance: true,
  Control: true,
  Agility: true,
};

const badgeOptions = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
};

export default function ElementEval(props) {
  const { elements, skaters: allSkaters, isFilterOpen, setIsFilterOpen } = useContext(Context);
  const [fundamentalFilter, setFundamentalFilter] = useState(
    fundamentalOptions
  );
  const [badgeFilter, setBadgeFilter] = useState(badgeOptions);

  const skaters = props.skaters || allSkaters;

  useEffect(() => {
    return () => {
      setIsFilterOpen(false);
    };
  }, [setIsFilterOpen]);

  function toggleBadgeFilter(badge) {
    setBadgeFilter((badgesObj) => ({
      ...badgesObj,
      [badge]: !badgesObj[badge],
    }));
  }

  function toggleFundamentalFilter(fundamental) {
    setFundamentalFilter((fundamentalObj) => ({
      ...fundamentalObj,
      [fundamental]: !fundamentalObj[fundamental],
    }));
  }

  const fundamentalsToDisplay = Object.entries(fundamentalFilter)
    .map(([key, value]) => (value ? key : null))
    .filter(Boolean);

  const badgesToDisplay = Object.entries(badgeFilter)
    .map(([key, value]) => (value ? parseInt(key) : null))
    .filter(Boolean);

  return (
    <div>
      {isFilterOpen && (
        <ElementFilter
          toggleBadgeFilter={toggleBadgeFilter}
          toggleFundamentalFilter={toggleFundamentalFilter}
          badgeFilterState={badgeFilter}
          fundamentalFilterState={fundamentalFilter}
        />
      )}
      <ElementEvalList
        fundamentals={fundamentalsToDisplay}
        badges={badgesToDisplay}
        skaters={skaters}
        elements={elements}
      />
    </div>
  );
}
