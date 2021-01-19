import React, { useContext, useState } from "react";
import { useClubSkaters } from "../Hooks/useClubSkaters";
import { logAPI } from "../API/logAPI";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import "./Distribution.css";
import DistributionItem from "./DistributionItem";
import { useRibbonById } from "../Hooks/useRibbonById";
import DistributionFilter from "./DistributionFilter";
import { FilterContainer } from "../FilterComponents/FilterContainer";
import Context from "../Context";
import { useToast } from "../Hooks/useToast";
import "./Distribution.css";

export default function Distribution() {
  const toast = useToast();
  const { skatersDispatch } = useContext(Context);
  const [showAll, setShowAll] = useState(true);
  const skaters = useClubSkaters();
  const getRibbonById = useRibbonById();

  async function distribution({ id, skater_id, ribbon_id, badge_id }) {
    try {
      if (badge_id) {
        await logAPI.distributeBadge(id);
      }
      if (ribbon_id) {
        await logAPI.distributeRibbon(id);
      }
      skatersDispatch({
        type: SKATER_ACTIONS.DISTRIBUTE,
        payload: {
          skater_id,
          badge_id,
          ribbon_id,
        },
      });
      toast({ message: "Distributed!", type: "success" });
    } catch (error) {
      toast({ message: "Server Error", type: "error" });
    }
  }

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
    const skaterBadgesToDistribute = skater.badgeLog.map((log) => ({
      ...log,
      skater_id: skater.id,
      skater_fullname: skater.fullname,
    }));
    return [...badges, ...skaterBadgesToDistribute];
  }, []);

  let distributionList = [...badgesToDistribute, ...ribbonsToDistribute].sort(
    (a, b) => b.date_completed - a.date_completed
  );
  if (!showAll)
    distributionList = distributionList.filter((log) => !log.date_distributed);
  return (
    <div className="Distribution">
      <FilterContainer>
        <DistributionFilter setShowAll={setShowAll} showAll={showAll} />
      </FilterContainer>

      <section className="DistributionList">
        <span>
          <b>Name:</b>
        </span>
        <span>
          <b>Badge/ Ribbon:</b>
        </span>
        <span>
          <b>Date Completed:</b>
        </span>
        <span>
          <b>Distribution:</b>
        </span>
        {distributionList.map((log) => (
          <DistributionItem
            key={`${log.skater_id}${log.badge_id || ""}${log.ribbon_id || ""}`}
            name={log.skater_fullname}
            badge={log.badge_id}
            ribbon={log.ribbon}
            date={log.date_completed}
            dateDistributed={log.date_distributed}
            distribution={() => distribution(log)}
          />
        ))}
      </section>
    </div>
  );
}
