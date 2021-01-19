import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import ProgressRouter from "./ProgressRouter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <ProgressRouter />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
