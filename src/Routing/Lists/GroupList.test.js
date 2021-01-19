import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import GroupList from "./GroupList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <GroupList />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
