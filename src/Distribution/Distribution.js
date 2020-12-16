import React, { useContext, useState } from "react";
import { useClubSkaters } from "../Hooks/useClubSkaters";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import "./Distribution.css";
import DistributionItem from "./DistributionItem";
import { useRibbonById } from "../Hooks/useRibbonById";
import DistributionFilter from "./DistributionFilter";
import { FilterContainer } from "../FilterContainer";
import Context from "../Context";

export default function Distribution() {
  const { skatersDispatch } = useContext(
    Context
  );
  const [showAll, setShowAll] = useState(true);
  const skaters = useClubSkaters();
  const getRibbonById = useRibbonById();


  const ribbonsToDistribute = skaters.reduce((ribbons, skater) => {
    const skaterRibbonsToDistribute = skater.ribbonLog.map((log) => {
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
      .map((log) => ({
        ...log,
        skater_id: skater.id,
        skater_fullname: skater.fullname,
      }));
    return [...badges, ...skaterBadgesToDistribute];
  }, []);

  let distributionList = [...badgesToDistribute, ...ribbonsToDistribute].sort(
    (a, b) => b.date - a.date
  );
  if (!showAll)
    distributionList = distributionList.filter((log) => !log.date_distributed);
  return (
    <div className="Distribution">
      <FilterContainer>
        <DistributionFilter setShowAll={setShowAll} showAll={showAll} />
      </FilterContainer>

      <ul className="DistributionList">
        <li key='header' className='DistributionItem'>
          <span>Name:</span>
          <span>Badge/ Ribbon:</span>
          <span>Date Completed:</span>
          <span>Distribution:</span>
        </li>
        {distributionList.map((log) => (
          <DistributionItem
            key={`${log.skater_id}${log.badge}${log.ribbon}`}
            name={log.skater_fullname}
            badge={log.badge}
            ribbon={log.ribbon}
            date={log.date}
            date_distributed={log.date_distributed}
            distribution={() =>
              skatersDispatch({
                type: SKATER_ACTIONS.DISTRIBUTE,
                payload: {
                  skater_id: log.skater_id,
                  badge_id: log.badge,
                  ribbon_id: log.ribbon_id,
                },
              })
            }
          />
        ))}
      </ul>
    </div>
  );
}
