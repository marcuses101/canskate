import React, { useState, useContext } from "react";
import BadgeSection from "./ElementEvalComponents/BadgeSection";
import ElementFilter from "./ElementFilter";
import { FilterContainer } from "../FilterContainer";
import Context from "../Context";
import "./Eval.css";
import { useClubSkaters } from "../Hooks/useClubSkaters";

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

export default function ElementEval({groupSkaters}) {
  const { elements } = useContext(Context);
  const clubSkaters = useClubSkaters();
  const skaters = (groupSkaters || clubSkaters).sort((a,b)=>a.fullname>b.fullname?1:-1);
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
      !badgeFilter[element.badge]
    )
      return obj;
    return {
      ...obj,
      [element.badge]: {
        ...obj[element.badge],
        [element.fundamental]: [
          ...obj[element.badge][element.fundamental],
          {...element,skaters: skaters.filter(skater=>!skater.elementLog.find(log=>log.element_id===element.element_id))},
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
  return (
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
  );
}
