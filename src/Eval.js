import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SkaterEval from "./Eval/SkaterEval";
import SkaterList from "./Eval/SkaterList";
import ElementEval from "./Eval/ElementEval";

export default function Eval() {
  const { path } = useRouteMatch();
  return (
    <div className="Eval">
      <Switch>
        <Route path={`${path}/skater/:id`} component={SkaterEval} />
        <Route path={`${path}/skater`} component={SkaterList} />
        <Route path={`${path}/element`} component={ElementEval} />
        <Route>
          <h1>Evals</h1>
          <ul>
            <li>
              <Link to="/eval/skater">Skater List</Link>
            </li>
            <li>
              <Link to="/eval/element">Element Evaluation</Link>
            </li>
          </ul>
        </Route>
      </Switch>
    </div>
  );
}
