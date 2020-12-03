import React from 'react'

const Context = React.createContext({
  nextSkaterId:0,
  elements:[],
  badges:[],
  ribbons:[],
  SKATER_ACTIONS:{},
  skatersDispatch(){},
  setIsFilterOpen(){},
  isFilterOpen: false
})

export default Context;