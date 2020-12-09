import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import ManageSkater from "./ManageSkater";
import ManageSession from './ManageSession';

export default function Manage() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/skater`} >
        <ManageSkater />
      </Route>
      <Route path={`${path}/session`} >
         <ManageSession />
      </Route>
      <Route>
        <div className="Manage">
          <h1>Manage Canskate</h1>
          <ul>
            <li>
              <Link to={`${path}/skater`}>Manage Skaters</Link>
            </li>
            <li>
              <Link to={`${path}/session`}>Manage Sessions</Link>
            </li>
          </ul>
        </div>
      </Route>
    </Switch>
  );
}
