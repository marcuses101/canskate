import React, { useContext } from "react";
import dayjs from "dayjs";
import Context from "../Context";
import ReportBadgeComponent from "./ReportBadgeComponent";
import './ReportCard.css'
const badges = [1, 2, 3, 4, 5, 6];

export default function ReportCard({ skater }) {
  const { elements, ribbons, checkmarks } = useContext(Context);
  const skaterBadges = badges.map((badge) => {
    return {
      badge_id: badge,
      date:
        skater.badgeLog.find((entry) => {
          return entry.badge === badge;
        })?.date || null,
    };
  });
  const skaterRibbons = ribbons.map((ribbon) => {
    return {
      ...ribbon,
      date:
        skater.ribbonLog.find((entry) => entry.ribbon_id === ribbon.id)?.date ||
        null,
    };
  });

  const skaterCheckmarks = checkmarks.map((checkmark) => {
    return {
      ...checkmark,
      date:
        skater.checkmarkLog.find(
          (entry) => entry.checkmark_id === checkmark.checkmark_id
        )?.date || null,
    };
  });
  const skaterElements = elements.map((element) => {
    return {
      ...element,
      date:
        skater.elementLog.find(
          (entry) => entry.element_id === element.element_id
        )?.date || null,
    };
  });

  const reportBadges = skaterBadges.map((badge) => {

    return (
      <ReportBadgeComponent
        key={badge.badge_id}
        badge={badge.badge_id}
        date={badge.date ? dayjs(badge.date).format("DD/MM/YYYY") : null}
        ribbons={skaterRibbons}
        checkmarks={skaterCheckmarks}
        elements={skaterElements}
      />
    );
  });
  return <div className="ReportCard">{reportBadges}</div>;
}
