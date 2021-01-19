import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SkaterEval from "../Evaluation/SkaterEval";
import SkaterList from "./Lists/SkaterList";
import ElementEval from "../Evaluation/ElementEval";
import SessionList from "./Lists/SessionList";
import GroupList from "./Lists/GroupList";
import GroupEval from "../Evaluation/GroupEval";
import Evaluation from "../Evaluation/Evaluation";
import PageNotFound from "./PageNotFound";

export default function EvaluationRouter() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/skater/:skater_id`} component={SkaterEval} />
      <Route path={`${path}/skater`} component={SkaterList} />
      <Route path={`${path}/element`} component={ElementEval} />
      <Route
        path={`${path}/session/:session_id/group/:group_id`}
        component={GroupEval}
      />
      <Route path={`${path}/session/:session_id`} component={GroupList} />
      <Route path={`${path}/session`} component={SessionList} />
      <Route exact path="/eval" component={Evaluation} />
      <Route>
        <PageNotFound url="/eval" />
      </Route>
    </Switch>
  );
}
