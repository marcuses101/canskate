import React from "react";
import ReactDOM from "react-dom";
import RadioSelector from "./RadioSelector";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RadioSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
