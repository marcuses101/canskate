import React, { useState, useContext, useEffect } from "react";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import ElementList from "./ElementList";
import ElementFilter from "./ElementFilter";
import {FilterContainer} from "../FilterContainer";
import Context from "../Context";
import "./SkaterEval.css";

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

export default function SkaterEval() {
  const { elements, isFilterOpen, setIsFilterOpen } = useContext(Context);
  const { elementLog: completedElements } = useSkaterFromParamId();
  const [fundamentalFilter, setFundamentalFilter] = useState(
    fundamentalOptions
  );
  const [badgeFilter, setBadgeFilter] = useState(badgeOptions);

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

  const filteredElements = elements.filter(
    (element) =>
      badgeFilter[element.badge] &&
      fundamentalFilter[element.fundamental] &&
      !completedElements.map((el) => el.element_id).includes(element.element_id)
  );

  return (
    <div className="SkaterEval">
      <FilterContainer>
        <ElementFilter
          toggleBadgeFilter={toggleBadgeFilter}
          toggleFundamentalFilter={toggleFundamentalFilter}
          badgeFilterState={badgeFilter}
          fundamentalFilterState={fundamentalFilter}
        />
      </FilterContainer>

      <ElementList elements={filteredElements} />
    </div>
  );
}
