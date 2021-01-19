import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import PageNotFound from "./PageNotFound";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <PageNotFound />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
