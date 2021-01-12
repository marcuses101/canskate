import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import AssignSkatersToGroups from "../Assign/AssignSkatersToGroups";
import SessionList from "../Routes/SessionList";
import AddSessionForm from "./AddSessionForm";
import EditSessionForm from "./EditSessionForm";

export default function ManageSession() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/add`} component={AddSessionForm} />
      <Route path={`${path}/edit/:session_id`} component={EditSessionForm} />
      <Route path={`${path}/edit`} component={SessionList} />
      <Route
        path={`${path}/assign/:session_id`}
        component={AssignSkatersToGroups}
      />
      <Route path={`${path}/assign`} component={SessionList} />
      <Route>
        <div className="ManageSkater">
          <h2 className="header">What would you like to do?</h2>

          <ul className="links">
            <li>
              <Link to={`${path}/add`}>Add Session</Link>
            </li>
            <li>
              <Link to={`${path}/edit`}>Edit Session</Link>
            </li>
            <li>
              <Link to={`${path}/assign`}>Assign Skaters to groups</Link>
            </li>
          </ul>
        </div>
      </Route>
    </Switch>
  );
}
