import React from "react";
import ReactDOM from "react-dom";
import FundamentalArticle from "./FundamentalArticle";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FundamentalArticle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
