import React, { useState ,useReducer } from "react";
import SideNav from './SideNav'
import Header from "./Header";
import Main from './Main'
import Context from "./Context";
import { skatersReducer } from "./services/SkaterReducer";
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
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  function closeNav(){setIsNavOpen(false)};
  function openNav(){setIsNavOpen(true)};
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skatersStore.map(createSkater)
  );
  const nextSkaterId = skaters.reduce((max,skater)=>{return (skater.id > max?skater.id:max)},0)+1
  const contextObj = {
    elements,
    checkmarks,
    ribbons,
    skaters,
    skatersDispatch,
    isFilterOpen,
    setIsFilterOpen,
    nextSkaterId
  };
  return (
    <Context.Provider value={contextObj}>
      <div className="App">
      <SideNav open={isNavOpen} closeNav={closeNav}/>
      <Header openNav={openNav}/>
      <Main/>
      </div>
    </Context.Provider>
  );
}
