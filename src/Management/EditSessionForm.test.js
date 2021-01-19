import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import EditSessionForm from "./EditSessionForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <EditSessionForm />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
