import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Main/Home";
import Distribution from "../Distribution/Distribution";
import EvaluationRouter from "./EvaluationRouter";
import ManagementRouter from "./ManagementRouter";
import ProgressRouter from "./ProgressRouter";
import PageNotFound from "./PageNotFound";

export default function PrimaryRouter() {
  return (
    <Switch>
      <Route path="/progress" component={ProgressRouter} />
      <Route path="/manage" component={ManagementRouter} />
      <Route path="/eval" component={EvaluationRouter} />
      <Route path="/distribution" component={Distribution} />
      <Route exact path="/" component={Home} />
      <Route>
        <PageNotFound url="/" />
      </Route>
    </Switch>
  );
}
