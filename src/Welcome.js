import React from "react";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="Welcome">
      <h2>What is it?</h2>
      <p>
        This application is designed to make managing the Canskate program a breeze.
      </p>
      <p>
        The main feature is the evaluation tool. You can evaluate by skater, by
        element, or by group. There are filters to display elements based on
        Badge and Fundamental area (Balance, Control, Agility). In the skater
        view only elements yet to be completed are displayed. In the
        element/group view, only the skaters yet to complete the element are
        displayed.
      </p>
      <p>
        When a ribbon/badge is completed the date is automatically logged, the
        skater's individual progress sheet is updated, and the ribbon/badge is
        added to a list of items to distribute.{" "}
      </p>

      
    </div>
  );
}
