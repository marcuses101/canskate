import React, { useState, useContext } from "react";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";
import { SKATER_ACTIONS } from "../services/skaterReducer";
import Context from "../Context";

export default function ElementButton({ element }) {
  const { checkmark_id, ribbon_id, badge } = element;
  const { skatersDispatch, checkmarks, ribbons } = useContext(Context);
  const skater = useSkaterFromParamId();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function logElement() {
    const elementRegex = new RegExp(element.checkmark_id + "\\d");
    const checkmarkRegex = new RegExp(element.ribbon_id + "\\d");
    const ribbonRegex = new RegExp(element.badge + "\\w");

    // log element
    skatersDispatch({
      type: SKATER_ACTIONS.COMPLETE_ELEMENT,
      payload: { skater_id: skater.id, element_id: element.element_id },
    });

    const { total_elements: elementsRequired } = checkmarks.find(
      (checkmark) => checkmark.checkmark_id === checkmark_id
    );

    const { checkmarks_required: checkmarksRequired } = ribbons.find(
      (ribbon) => ribbon.id === ribbon_id
    );

    const ribbonsRequired = 3;
    // completed elements for the checkmark
    const checkmarkElements = skater.elementLog.reduce(
      (acc, { element_id }) => {
        return elementRegex.test(element_id) ? acc + 1 : acc;
      },
      0
    );

    // exit function if checkmark not complete
    if (checkmarkElements !== elementsRequired - 1) return;

    skatersDispatch({
      type: SKATER_ACTIONS.COMPLETE_CHECKMARK,
      payload: {
        skater_id: skater.id,
        checkmark_id,
      },
    });

    const ribbonCheckmarks = skater.checkmarkLog.reduce(
      (acc, { checkmark_id }) =>
        checkmarkRegex.test(checkmark_id) ? acc + 1 : acc,
      0
    );
    if (ribbonCheckmarks !== (checkmarksRequired-1)) return

    skatersDispatch({
      type: SKATER_ACTIONS.COMPLETE_RIBBON,
      payload:{
        skater_id: skater.id,
        ribbon_id
      }
    })

    // completed checkmarks for the ribbon
    const badgeRibbons = skater.ribbonLog.reduce(
      (acc, { ribbon_id }) => (ribbonRegex.test(ribbon_id) ? acc + 1 : acc),
      0
    );
    if (badgeRibbons !== (ribbonsRequired -1)) return

    skatersDispatch({
      type: SKATER_ACTIONS.COMPLETE_BADGE,
      payload:{
        skater_id: skater.id,
        badge
      }
    })
  }
  return (
    <div
      className="ElementButton"
      onClick={() => setConfirmOpen((bool) => !bool)}
    >
      <div>{element.element}</div>
      {confirmOpen ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            logElement();
          }}
        >
          ✓
        </button>
      ) : null}
    </div>
  );
}
