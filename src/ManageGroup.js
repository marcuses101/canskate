import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";

export default function ManageGroup() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/add`}/>
      <Route path={`${path}/edit`} />
      <Route>
        <div className="ManageGroup">
          <ul>
            <li>
              <Link to={`${path}/add`}>Add Group</Link>
            </li>
            <li>
              <Link to={`${path}/edit`}>Edit Group</Link>
            </li>
          </ul>
        </div>
      </Route>
    </Switch>
  );
}
