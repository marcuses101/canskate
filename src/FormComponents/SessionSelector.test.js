import React from "react";
import ReactDOM from "react-dom";
import SessionSelector from "./SessionSelector";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SessionSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
