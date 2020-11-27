import React, { useReducer } from "react";
import { SKATER_ACTIONS,skatersReducer } from "./services/SkaterReducer";
import { skaters as skatersStore } from "./store/skaterStore.json";
import SkaterForm from "./forms/SkaterForm";



export default function SkaterListTest() {
  const [skaters, skatersDispatch] = useReducer(
    skatersReducer,
    skatersStore.map((skater) => ({
      ...skater,
      elementLog: [],
      checkmarkLog: [],
      ribbonLog: [],
      badgeLog: [],
    }))
  );
  return (
    <div className="SkaterListTest">
      <SkaterForm dispatch={skatersDispatch} />
      <ul>
        {skaters.map((skater) => {
          return (
            <li key={skater.id}>
              {skater.fullname}
              <button
                onClick={() =>
                  skatersDispatch({
                    type: SKATER_ACTIONS.DELETE_SKATER,
                    payload: skater,
                  })
                }
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
