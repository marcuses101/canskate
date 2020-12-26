import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="Welcome">
      <h2>What is it?</h2>
      <p>
        This application is designed to managing the Canskate program a breeze.
      </p>
      <p>
        The main feature is the evaluation tool. You can evaluate by skater, by
        element, or by group. There are filters to display elements based on
        Badge and Fundamental area (Balance, Control Agility). In the skater
        view only elements yet to be completed are displayed. In the
        element/group view, only the skaters yet to complete the element are
        displayed.
      </p>
      <p>
        When a ribbon/badge is completed the date is automatically logged, the
        skater's individual progress sheet is updated, and the ribbon/badge is
        added to a list of items to distribute.{" "}
      </p>

      <p>
        I will be continuing to develop this application going forward, and your
        feedback will be essential in creating a great tool.
      </p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLScTEUH7_XaK5sDyQ1_w_NX9EIxJQS0aGpyxJ5Yejts38G4waQ/viewform?usp=sf_link">
        Survey
      </a>

      <p>Currently this application is pre-populated with fake sessions/groups/skaters.</p>

      <br />
      <h2>What would you like to do?</h2>
      <ul className="links">
        <li>
          <Link to="/eval">Evaluate</Link>
        </li>
        <li>
          <Link to="/progress">View Progress</Link>
        </li>
        <li>
          <Link to="/manage">Manage Sessions/Groups/Skaters</Link>
        </li>
        <li>
          <Link to="/distribution">Distribute Ribbons/Badges</Link>
        </li>
      </ul>
    </div>
  );
}
