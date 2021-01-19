import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import SkaterList from "./SkaterList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <SkaterList />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
