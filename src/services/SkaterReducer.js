import {v4 as uuid} from 'uuid';

const SKATER_ACTIONS = {
  ADD_SKATER: "add_skater",
  DELETE_SKATER: "delete_skater",
  COMPLETE_ELEMENT: "complete_element",
};

function skatersReducer(state, action) {
  switch (action.type) {
    case SKATER_ACTIONS.ADD_SKATER: {
      return [{ ...action.payload, id: uuid() }, ...state];
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
    default:
      return state;
  }
}

export {SKATER_ACTIONS,skatersReducer}