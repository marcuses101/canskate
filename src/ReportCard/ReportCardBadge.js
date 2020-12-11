import React from "react";
import "./ReportCardBadge.css";

export default function ReportCardBadge({ badge, date }) {
  const classes = {1:'one',2:'two',3:'three',4:'four',5:'five'}

  return (
      <div className={`ReportCardBadge${date ? " complete" : ""} ${classes[badge]}`}>
        <span>Badge {badge}</span>
        <span>{date}</span>
      </div>
  );
}
