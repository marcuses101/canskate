import React from "react";
import ReactDOM from "react-dom";
import Distribution from "./Distribution";

it("renders without crashing", () => {
  document.body.innerHTML = `<div id='root'></div><div id='filterContainer'></div>'`
  ReactDOM.render(<Distribution />, document.getElementById('root'));
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
});
