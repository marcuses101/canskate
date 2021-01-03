import React, { useState, useReducer, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import SideNav from "./SideNav";
import Header from "./Header";
import Main from "./Main";
import Context from "./Context";
import {clubAPI} from './API/clubAPI';
import { skatersReducer, SKATER_ACTIONS } from "./services/skaterReducer";
import { clubReducer, CLUB_ACTIONS } from "./services/clubReducer";
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
  const {pathname} = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [club, clubDispatch] = useReducer(clubReducer, buildClub(store));
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skaterStore
      .map(createSkater)
      .sort((a, b) => (a.fullname > b.fullname ? 1 : -1))
  );

  // close filter on route change
  useEffect(()=>{
    setIsFilterOpen(false)
  },[pathname])

  //test load club data
  useEffect(()=>{
    (async()=>{
      const clubData = await clubAPI.getClubById(1);
      const club = buildClub(clubData)
      clubDispatch({type:CLUB_ACTIONS.LOAD_CLUB, payload:club})
      skatersDispatch({type:SKATER_ACTIONS.LOAD_SKATERS,payload:clubData.skatersWithLogs})
      console.log(club)
    })()
  },[])

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
