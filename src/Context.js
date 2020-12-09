import React from 'react'

const Context = React.createContext({
  nextSkaterId:0,
  club: {},
  clubDispatch(){},
  elements:[],
  checkmarks:[],
  badges:[],
  ribbons:[],
  SKATER_ACTIONS:{},
  skatersDispatch(){},
  setIsFilterOpen(){},
  isFilterOpen: false
})

export default Context;