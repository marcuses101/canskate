import React, { useReducer } from "react";
import SkaterEval from "./Eval/SkaterEval";
import Context from "./Context";
import { SKATER_ACTIONS, skatersReducer } from "./services/SkaterReducer";
import {
  skaters as skatersStore,
  skaterGroupEntries,
  groups as groupStore,
} from "./store/skaterStore.json";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";
import "./App.css";

function createSkater(skater) {
  const groups = skaterGroupEntries.reduce((acc, cur) => {
    if (cur.skater_id === skater.id)
      return [...acc, groupStore.find((group) => group.id === cur.group_id)];
    return [...acc];
  }, []);
  return {
    ...skater,
    elementLog: [],
    checkmarkLog: [],
    ribbonLog: [],
    badgeLog: [],
    sessions: [],
    groups: groups,
  };
}

export default function App() {
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skatersStore.map(createSkater)
  );
  const contextObj = {
    elements,
    checkmarks,
    ribbons,
    SKATER_ACTIONS: SKATER_ACTIONS,
    skatersDispatch,
  };
  return (
    <Context.Provider value={contextObj}>
      <div className="App">
        <SkaterEval skater={skaters[0]} />
      </div>
    </Context.Provider>
  );
}
