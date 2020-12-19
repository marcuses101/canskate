import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SkaterEval from "./NewEval/SkaterEval";
import SkaterList from "./Eval/SkaterList";
import ElementEval from "./NewEval/ElementEval";
import SessionList from './Eval/SessionList'
import GroupList from './Eval/GroupList'
import GroupEval from './NewEval/GroupEval'

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
          <h1>Evals</h1>
          <ul>
            <li>
              <Link to="/eval/skater">Skater Evaluation</Link>
            </li>
            <li>
              <Link to="/eval/element">Element Evaluation</Link>
            </li>
            <li>
              <Link to="/eval/session">Session Evaluation</Link>
            </li>
          </ul>
        </Route>
      </Switch>
    </div>
  );
}
