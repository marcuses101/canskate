import React from "react";
import ReactDOM from "react-dom";
import Resize from "./Resize";

class ResizeObserver {
  observe() {}
  unobserve() {}
}
window.ResizeObserver = ResizeObserver;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Resize />, div);
  ReactDOM.unmountComponentAtNode(div);
});
