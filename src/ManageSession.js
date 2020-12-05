import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import AddSessionForm from './forms/AddSessionForm'

export default function ManageSession() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/add`} component={AddSessionForm} />
      <Route path={`${path}/edit`} />
      <Route>
        <div className="ManageSkater">
          <ul>
            <li>
              <Link to={`${path}/add`}>Add Session</Link>
            </li>
            <li>
              <Link to={`${path}/edit`}>Edit Session</Link>
            </li>
          </ul>
        </div>
      </Route>
    </Switch>
  );
}
