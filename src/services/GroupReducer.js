const GROUP_ACTIONS = {
  ADD_GROUP: 'add_group'
}

function groupReducer (state,action){
  switch(action.type){
    case GROUP_ACTIONS.ADD_GROUP:{
      return [{...action.payload}, ...state]
    }
    default:
      return state;
  }
}

export {GROUP_ACTIONS, groupReducer}