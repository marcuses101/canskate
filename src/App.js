import React, { useState, useReducer } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import Main from "./Main";
import Context from "./Context";
import { skatersReducer } from "./services/skaterReducer";
import { clubReducer } from "./services/clubReducer";
import { skaters as skaterStore } from "./store/clubStore.json";
import store from "./store/clubStore.json";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";
import "./App.css";

function createSkater(skater) {
  return {
    ...skater,
    elementLog: [],
    checkmarkLog: [],
    ribbonLog: [],
    badgeLog: [],
  };
}
function buildClub(store) {
  const { sessions, groups, skaterGroupEntries, skaterSessionEntries } = store;
  function convertArrayToObject(array, key) {
    return array.reduce((obj, entry) => {
      return { ...obj, [entry[key]]: entry };
    }, {});
  }
  const club = {
    sessions: convertArrayToObject(
      sessions.map((session) => ({
        ...session,
        skaters: skaterSessionEntries
          .filter(({ session_id }) => session.id === session_id)
          .map((entry) => entry.skater_id),
      })),
      "id"
    ),
    groups: convertArrayToObject(
      groups.map((group) => ({
        ...group,
        skaters: skaterGroupEntries
          .filter(({ group_id }) => group_id === group.id)
          .map((entry) => entry.skater_id),
      })),
      "id"
    ),
  };
  return club;
}

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [club, clubDispatch] = useReducer(clubReducer, buildClub(store));
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skaterStore
      .map(createSkater)
      .sort((a, b) => (a.fullname > b.fullname ? 1 : -1))
  );
  console.log(skaters)
  console.log(club);
  function closeNav() {
    setIsNavOpen(false);
  }
  function openNav() {
    setIsNavOpen(true);
  }
  const nextSkaterId =
    skaters.reduce((max, skater) => {
      return skater.id > max ? skater.id : max;
    }, 0) + 1;
  const contextObj = {
    elements,
    checkmarks,
    ribbons,
    club,
    clubDispatch,
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
