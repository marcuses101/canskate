import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SkaterProgress from "../Progress/SkaterProgress";
import SkaterList from "./Lists/SkaterList";
import GroupList from "./Lists/GroupList";
import SessionList from "./Lists/SessionList";
import Progress from "../Progress/Progress";
import PageNotFound from "./PageNotFound";

export default function ProgressRouter() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/skater/:skater_id`} component={SkaterProgress} />
      <Route path={`${path}/skater`} component={SkaterList} />
      <Route path={`${path}/session/:session_id`} component={GroupList} />
      <Route path={`${path}/session`} component={SessionList} />
      <Route exact path={path}>
        <Progress />
      </Route>
      <Route>
        <PageNotFound url={path} />
      </Route>
    </Switch>
  );
}
