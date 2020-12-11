import React from "react";
import ReportCheckmarkComponent from "./ReportCheckmarkComponent";

export default function ReportCheckmarkList({ checkmarks, elements }) {
  const checkmarkComponents = checkmarks.map((checkmark) => {
    const checkmarkElements = elements.filter(
      (element) => element.checkmark_id === checkmark.checkmark_id
    );
    return (
      <ReportCheckmarkComponent
        key={checkmark.checkmark_id}
        checkmark={checkmark}
        elements={checkmarkElements}
        date={checkmark.date}
      />
    );
  });
  return <div className="ReportCheckmark">{checkmarkComponents}</div>;
}
