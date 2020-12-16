import React, { useState, useContext } from "react";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import ElementList from "./ElementList";
import ElementFilter from "./ElementFilter";
import { FilterContainer } from "../FilterContainer";
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
  const { elements } = useContext(Context);
  const { elementLog: completedElements } = useSkaterFromParamId();
  const [fundamentalFilter, setFundamentalFilter] = useState(
    fundamentalOptions
  );
  const [badgeFilter, setBadgeFilter] = useState(badgeOptions);

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

  const elementObject = elements.reduce((obj, element) => {
    if (
      !fundamentalFilter[element.fundamental] ||
      !badgeFilter[element.badge] ||
      completedElements.includes(element.id)
    )
      return obj;
    return {
      ...obj,
      [element.badge]: obj[element.badge]
        ? {
            ...obj[element.badge],
            [element.fundamental]: obj[element.badge][element.fundamental]
              ? [...obj[element.badge][element.fundamental], element]
              : [element],
          }
        : { [element.fundamental]: [element] },
    };
  }, {});
  const fundamentals = Object.entries(fundamentalFilter).reduce(
    (acc, [key, value]) => (value ? [...acc, key] : acc),
    []
  );
  const badges = Object.entries(badgeFilter).reduce(
    (acc, [key, value]) => (value ? [...acc, key] : acc),
    []
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

      <ElementList
        elements={filteredElements}
        badges={badges}
        fundamentals={fundamentals}
      />
    </div>
  );
}
