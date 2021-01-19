import React from "react";
import ReactDOM from "react-dom";
import ElementFilter from "./ElementFilter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ElementFilter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
