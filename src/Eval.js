import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SkaterEval from "./Evaluation/SkaterEval";
import SkaterList from "./Routes/SkaterList";
import ElementEval from "./Evaluation/ElementEval";
import SessionList from './Routes/SessionList'
import GroupList from './Routes/GroupList'
import GroupEval from './Evaluation/GroupEval'

export default function Eval() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/skater/:skater_id`} component={SkaterEval} />
        <Route path={`${path}/skater`} component={SkaterList} />
        <Route path={`${path}/element`} component={ElementEval} />
        <Route path={`${path}/session/:session_id/group/:group_id`} component={GroupEval}/>
        <Route path={`${path}/session/:session_id`} component={GroupList}/>
        <Route path={`${path}/session`} component={SessionList} />
        <Route>
          <h2 className='header'>What would you like to evaluate?</h2>
          <ul className='links'>
            <li>
              <Link to="/eval/skater">Skater</Link>
            </li>
            <li>
              <Link to="/eval/element">Club</Link>
            </li>
            <li>
              <Link to="/eval/session">Group</Link>
            </li>
          </ul>
        </Route>
      </Switch>
    </div>
  );
}
