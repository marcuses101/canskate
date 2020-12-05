import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SkaterEval from "./Eval/SkaterEval";
import SkaterList from "./Eval/SkaterList";
import ElementEval from "./Eval/ElementEval";
import SessionEvalList from './Eval/SessionEvalList'
import GroupEvalList from './Eval/GroupEvalList'
import GroupEval from './Eval/GroupEval'

export default function Eval() {
  const { path } = useRouteMatch();
  return (
    <div className="Eval">
      <Switch>
        <Route path={`${path}/skater/:id`} component={SkaterEval} />
        <Route path={`${path}/skater`} component={SkaterList} />
        <Route path={`${path}/element`} component={ElementEval} />
        <Route path={`${path}/session/:session_id/group/:group_id`} component={GroupEval}/>
        <Route path={`${path}/session/:id`} component={GroupEvalList}/>
        <Route path={`${path}/session`} component={SessionEvalList} />
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
