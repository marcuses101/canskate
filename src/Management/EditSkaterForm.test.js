import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import EditSkaterForm from "./EditSkaterForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <EditSkaterForm />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
