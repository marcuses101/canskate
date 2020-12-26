import React, { useState, useContext } from "react";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import {Link} from 'react-router-dom'
import BadgeSection from "./SkaterEvalComponents/BadgeSection";
import ElementFilter from "./ElementFilter";
import { FilterContainer } from "../FilterContainer";
import Context from "../Context";
import "./Eval.css";

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

const elementObjectShape = {
  1: { Balance: [], Control: [], Agility: [] },
  2: { Balance: [], Control: [], Agility: [] },
  3: { Balance: [], Control: [], Agility: [] },
  4: { Balance: [], Control: [], Agility: [] },
  5: { Balance: [], Control: [], Agility: [] },
  6: { Balance: [], Control: [], Agility: [] },
};

export default function SkaterEval() {
  const { elements } = useContext(Context);
  const { elementLog: completedElements,id } = useSkaterFromParamId();
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

  const elementObject = elements.reduce((obj, element) => {
    if (
      !fundamentalFilter[element.fundamental] ||
      !badgeFilter[element.badge] ||
      completedElements.map((el) => el.element_id).includes(element.element_id)
    )
      return obj;
    return {
      ...obj,
      [element.badge]: {
        ...obj[element.badge],
        [element.fundamental]: [
          ...obj[element.badge][element.fundamental],
          element,
        ],
      },
    };
  }, elementObjectShape);
  const fundamentals = Object.entries(fundamentalFilter).reduce(
    (acc, [key, value]) => (value ? [...acc, key] : acc),
    []
  );
  const badges = Object.entries(badgeFilter).reduce(
    (acc, [key, value]) => (value ? [...acc, key] : acc),
    []
  );
  return (<>
      <Link to={`/progress/skater/${id}`}>Go to progress page</Link>
    <div className="Eval">
      <FilterContainer>
        <ElementFilter
          toggleBadgeFilter={toggleBadgeFilter}
          toggleFundamentalFilter={toggleFundamentalFilter}
          badgeFilterState={badgeFilter}
          fundamentalFilterState={fundamentalFilter}
        />
      </FilterContainer>
      {badges.map((badge) => (
        <BadgeSection
          key={badge}
          badge={badge}
          fundamentals={fundamentals}
          elements={elementObject[badge]}
        />
      ))}
    </div>
    </>
  );
}
