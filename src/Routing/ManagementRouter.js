import React from "react";
import { Switch, Route } from "react-router-dom";
import SessionList from "./Lists/SessionList";
import SkaterList from "./Lists/SkaterList";
import ManageSkater from "../Management/ManageSkater";
import ManageSession from "../Management/ManageSession";
import Manage from "../Management/Manage";
import AddSkaterForm from "../Management/AddSkaterForm";
import EditSkaterForm from "../Management/EditSkaterForm";
import AddSessionForm from "../Management/AddSessionForm";
import EditSessionForm from "../Management/EditSessionForm";
import AssignSkatersToGroups from "../Management/Assign/AssignSkatersToGroups";
import PageNotFound from "./PageNotFound";
export default function ManagementRouter() {
  return (
    <Switch>
      <Route
        path={`/manage/session/assign/:session_id`}
        component={AssignSkatersToGroups}
      />
      {/* Manage Skater Routes */}
      <Route path="/manage/skater/add" component={AddSkaterForm} />
      <Route path="/manage/skater/edit/:skater_id" component={EditSkaterForm} />
      <Route path="/manage/skater/edit" component={SkaterList} />
      <Route path="/manage/skater" component={ManageSkater} />
      {/* Manage Session Routes */}
      <Route path="/manage/session/assign" component={SessionList} />
      <Route
        path="/manage/session/edit/:session_id"
        component={EditSessionForm}
      />
      <Route path="/manage/session/edit" component={SessionList} />
      <Route path="/manage/session/add" component={AddSessionForm} />
      <Route path="/manage/session" component={ManageSession} />
      <Route exact path="/manage" component={Manage} />
      <Route>
        <PageNotFound url="/manage" />
      </Route>
    </Switch>
  );
}
