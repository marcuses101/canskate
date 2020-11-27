import React from 'react'

const Context = React.createContext({
  elements:[],
  badges:[],
  ribbons:[],
  SKATER_ACTIONS:{},
  skatersDispatch(){}
})

export default Context;