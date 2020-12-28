import dayjs from "dayjs";

const SKATER_ACTIONS = {
  ADD_SKATER: "add_skater",
  EDIT_SKATER: "edit_skater",
  DELETE_SKATER: "delete_skater",
  DISTRIBUTE: "distribute",
  COMPLETE_ELEMENT: "complete_element",
  COMPLETE_CHECKMARK: "complete_checkmark",
  COMPLETE_RIBBON: "complete_ribbon",
  COMPLETE_BADGE: "complete_badge",
};

function skatersReducer(state, action) {
  switch (action.type) {
    case SKATER_ACTIONS.ADD_SKATER: {
      return [
        {
          ...action.payload,
          elementLog: [],
          checkmarkLog: [],
          ribbonLog: [],
          badgeLog: [],
        },
        ...state,
      ];
    }

    case SKATER_ACTIONS.EDIT_SKATER: {
      const newState = state.map((skater) => {
        if (skater.id !== action.payload.id) return skater;
        return {
          ...skater,
          ...action.payload,
        };
      });
      return newState;
    }

    case SKATER_ACTIONS.DELETE_SKATER: {
      const { id } = action.payload;
      return state.filter((skater) => skater.id !== id);
    }

    case SKATER_ACTIONS.COMPLETE_ELEMENT: {
      const { skater_id, element_id } = action.payload;
      const newState = state.map((skater) => {
        if (skater.id !== skater_id) return skater;
        return {
          ...skater,
          elementLog: [...skater.elementLog, { element_id, date: new Date() }],
        };
      });
      return newState;
    }
    case SKATER_ACTIONS.COMPLETE_CHECKMARK: {
      const { skater_id, checkmark_id } = action.payload;
      const newState = state.map((skater) => {
        if (skater.id !== skater_id) return skater;
        return {
          ...skater,
          checkmarkLog: [
            ...skater.checkmarkLog,
            { checkmark_id, date: new Date() },
          ],
        };
      });
      return newState;
    }
    case SKATER_ACTIONS.COMPLETE_RIBBON: {
      const { skater_id, ribbon_id } = action.payload;
      const newState = state.map((skater) => {
        if (skater.id !== skater_id) return skater;
        return {
          ...skater,
          ribbonLog: [
            ...skater.ribbonLog,
            { ribbon_id, date: new Date(), date_distributed: null },
          ],
        };
      });
      return newState;
    }
    case SKATER_ACTIONS.COMPLETE_BADGE: {
      const { skater_id, badge } = action.payload;
      const newState = state.map((skater) => {
        if (skater.id !== skater_id) return skater;
        return {
          ...skater,
          badgeLog: [
            ...skater.badgeLog,
            { badge, date: new Date(), date_distributed: null },
          ],
        };
      });
      return newState;
    }
    case SKATER_ACTIONS.DISTRIBUTE: {
      const { skater_id, ribbon_id = null, badge_id = null } = action.payload;
      console.log({skater_id,ribbon_id,badge_id})
      return state.map((skater) => {
        if (skater.id !== skater_id) return skater;
        return ribbon_id
          ? {
              ...skater,
              ribbonLog: skater.ribbonLog.map((log) =>
                log.ribbon_id === ribbon_id
                  ? { ...log, date_distributed: new Date() }
                  : log
              ),
            }
          : {
              ...skater,
              badgeLog: skater.badgeLog.map((log) =>
                log.badge === badge_id
                  ? { ...log, date_distributed: new Date() }
                  : log
              ),
            };
      });
    }
    default:
      return state;
  }
}

export { SKATER_ACTIONS, skatersReducer };
