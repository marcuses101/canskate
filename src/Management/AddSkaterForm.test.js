import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import AddSkaterForm from "./AddSkaterForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <AddSkaterForm />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
