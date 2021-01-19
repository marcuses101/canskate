import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Progress from "./Progress";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Progress />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
