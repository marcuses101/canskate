import React, { useState, useReducer } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import Main from "./Main";
import Context from "./Context";
import { skatersReducer } from "./services/SkaterReducer";
import {
  skaters as skaterStore
} from "./store/skaterStore.json";
import store from "./store/skaterStore.json";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";
import "./App.css";

function createSkater(skater) {
  return {
    ...skater,
    elementLog: [],
    checkmarkLog: [],
    ribbonLog: [],
    badgeLog: [],
    sessions: [],
  };
}
function buildClub(store) {
  const { sessions, groups, skaterGroupEntries } = store;
  const club = {
    skaters: store.skaters.map(skater=>skater.id),
    sessions: sessions.reduce((acc, session) => {
      return [
        {
          ...session,
          groups: groups
            .filter((group) => group.session_id === session.id)
            .map((group) => ({
              skater_ids: skaterGroupEntries
                .filter((entry) => entry.group_id === group.id)
                .map((entry) => entry.skater_id),
              ...group,
            })),
        },
        ...acc,
      ];
    }, []),
  };
  club.sessions = club.sessions.map(session=>{return {skaters: session.groups.reduce((acc,group)=>{
    return [...group.skater_ids,...acc]
  },[]),...session}})
  return club
}

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [club, setClub] = useState(buildClub(store));

  function closeNav() {
    setIsNavOpen(false);
  }
  function openNav() {
    setIsNavOpen(true);
  }
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skaterStore
      .map(createSkater)
      .sort((a, b) => (a.fullname > b.fullname ? 1 : -1))
  );
  const nextSkaterId =
    skaters.reduce((max, skater) => {
      return skater.id > max ? skater.id : max;
    }, 0) + 1;
  const contextObj = {
    elements,
    checkmarks,
    ribbons,
    club,
    skaters,
    skatersDispatch,
    isFilterOpen,
    setIsFilterOpen,
    nextSkaterId,
  };
  return (
    <Context.Provider value={contextObj}>
      <div className="App">
        <SideNav open={isNavOpen} closeNav={closeNav} />
        <Header openNav={openNav} />
        <Main />
      </div>
    </Context.Provider>
  );
}
