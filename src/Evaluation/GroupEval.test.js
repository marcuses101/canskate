import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import GroupEval from "./GroupEval";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const filterContainer = document.createElement("div");
  filterContainer.setAttribute("id", "filterContainer");
  document.body.appendChild(filterContainer);
  ReactDOM.render(
    <MemoryRouter>
      <GroupEval />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
