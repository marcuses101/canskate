import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import AddClubForm from "./AddClubForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <AddClubForm />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
