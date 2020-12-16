import React, { useState, useContext } from "react";
import ElementEvalList from "../ElementEvalList";
import ElementFilter from "./ElementFilter";
import { FilterContainer } from "../FilterContainer";
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
  const { elements, skaters: allSkaters } = useContext(Context);

  const [fundamentalFilter, setFundamentalFilter] = useState(
    fundamentalOptions
  );
  const [badgeFilter, setBadgeFilter] = useState(badgeOptions);

  // session/group path passes in skaters, otherwise use all skaters from context
  const skaters = props.skaters || allSkaters;

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
      <FilterContainer>
        <ElementFilter
          toggleBadgeFilter={toggleBadgeFilter}
          toggleFundamentalFilter={toggleFundamentalFilter}
          badgeFilterState={badgeFilter}
          fundamentalFilterState={fundamentalFilter}
        />
      </FilterContainer>

      <ElementEvalList
        fundamentals={fundamentalsToDisplay}
        badges={badgesToDisplay}
        skaters={skaters}
        elements={elements}
      />
    </div>
  );
}
