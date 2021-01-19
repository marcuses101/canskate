import React from "react";

const Context = React.createContext({
  club: {},
  clubDispatch() {},
  elements: [],
  checkmarks: [],
  badges: [],
  ribbons: [],
  skatersDispatch() {},
  setIsFilterOpen() {},
  isFilterOpen: false,
  setIsNavOpen() {},
  setLoginState() {},
  setClubList() {},
  setUsername() {},
});

export default Context;
