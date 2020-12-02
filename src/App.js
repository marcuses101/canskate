import React, { useState ,useReducer } from "react";
import {Route, Switch} from "react-router-dom"
import SkaterEval from "./Eval/SkaterEval";
import SkaterList from './SkaterList';
import Welcome from './Welcome'
import Progress from './Progress'
import Manage from "./Manage";
import Eval from './Eval';
import SideNav from './SideNav'
import Context from "./Context";
import { skatersReducer } from "./services/SkaterReducer";
import {
  skaters as skatersStore,
  skaterGroupEntries,
  groups as groupStore,
} from "./store/skaterStore.json";
import { elements, checkmarks, ribbons } from "./store/elementStore.json";
import "./App.css";
import ElementEval from "./Eval/ElementEval";
import Header from "./Header";

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
  const [navOpen, setNavOpen] = useState(false)
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skatersStore.map(createSkater)
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const contextObj = {
    elements,
    checkmarks,
    ribbons,
    skaters,
    skatersDispatch,
    isFilterOpen,
    setIsFilterOpen
  };
  return (
    <Context.Provider value={contextObj}>
      <div className="App">
      <Header/>
      <SideNav className={navOpen?'open':'closed'}/>
      <Switch>
        <Route path='/progress' component={Progress}/>
        <Route path='/manage' component={Manage}/>
        <Route path="/eval/skater/:id" component={SkaterEval}/>
        <Route path="/eval/skater" component={SkaterList}/>
        <Route path='/eval/element' component={ElementEval}/>
        <Route path='/eval' component={Eval} />
        <Route path="/" component={Welcome}/>
      </Switch>
      </div>
    </Context.Provider>
  );
}
