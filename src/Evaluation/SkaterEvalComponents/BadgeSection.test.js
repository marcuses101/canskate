import React from "react";
import ReactDOM from "react-dom";
import BadgeSection from "./BadgeSection";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BadgeSection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
