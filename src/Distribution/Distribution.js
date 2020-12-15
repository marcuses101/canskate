import React from "react";
import dayjs from "dayjs";
import { useClubSkaters } from "../Hooks/useClubSkaters";
import "./Distribution.css";
import DistributionItem from "./DistributionItem";
import { useRibbonById } from "../Hooks/useRibbonById";

export default function Distribution() {
  const skaters = useClubSkaters();
  const getRibbonById = useRibbonById();
  const ribbonsToDistribute = skaters.reduce((ribbons, skater) => {
    const skaterRibbonsToDistribute = skater.ribbonLog
      .filter((ribbon) => !ribbon.date_distributed)
      .map((log) => {
        const { fundamental_area, stage } = getRibbonById(log.ribbon_id);
        return {
          ...log,
          skater_id: skater.id,
          skater_fullname: skater.fullname,
          ribbon: `${fundamental_area} ${stage}`,
        };
      });
    return [...ribbons, ...skaterRibbonsToDistribute];
  }, []);
  const badgesToDistribute = skaters.reduce((badges, skater) => {
    const skaterBadgesToDistribute = skater.badgeLog
      .filter((badge) => !badge.date_distributed)
      .map((log) => ({
        ...log,
        skater_id: skater.id,
        skater_fullname: skater.fullname,
      }));
    return [...badges, ...skaterBadgesToDistribute];
  }, []);

  const distributionList = [...badgesToDistribute, ...ribbonsToDistribute].sort(
    (a, b) => b.date - a.date
  );
  console.log({ distributionList });
  return (
    <div className="Distribution">
      <ul className="DistributionList">
        {distributionList.map((log) => (
          <DistributionItem
            key={`${log.skater_id}${log.badge}${log.ribbon}`}
            name={log.skater_fullname}
            badge={log.badge}
            ribbon={log.ribbon}
            date={log.date}
          />
        ))}
      </ul>
    </div>
  );
}
