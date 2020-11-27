import React, { useState, useContext } from "react";
import SkaterEvalHeader from "./SkaterEvalHeader";
import ElementList from "./ElementList";
import ElementFilter from "./ElementFilter";
import {SKATER_ACTIONS} from '../services/SkaterReducer'
import Context from "../Context";
import "./SkaterEval.css";

export default function SkaterEval(props) {
  const { skater } = props;
  const { elements, skatersDispatch} = useContext(Context);
  const { elementLog: completedElements } = skater;
  const [filterOpen, setFilterOpen] = useState(false);
  const [fundamentalFilter, setFundamentalFilter] = useState({
    Balance: true,
    Control: true,
    Agility: true,
  });
  const [badgeFilter, setBadgeFilter] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

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
      !completedElements.map(el=>el.element_id).includes(element.element_id)
  );

  function logElement(element_id) {
    skatersDispatch({type: SKATER_ACTIONS.COMPLETE_ELEMENT, payload: {skater_id:skater.id, element_id}})
  }
  return (
    <div className="SkaterEval">
      <SkaterEvalHeader
        name={props.skater.fullname}
        filterOpen={filterOpen}
        toggleFilterOpen={() => {
          setFilterOpen((bool) => !bool);
        }}
      />
      {filterOpen && (
        <ElementFilter
          toggleBadgeFilter={toggleBadgeFilter}
          toggleFundamentalFilter={toggleFundamentalFilter}
          badgeFilterState={badgeFilter}
          fundamentalFilterState={fundamentalFilter}
        />
      )}
      <ElementList elements={filteredElements} logElement={logElement} />
    </div>
  );
}
