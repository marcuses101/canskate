import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import EvaluationRouter from "./EvaluationRouter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <EvaluationRouter />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
