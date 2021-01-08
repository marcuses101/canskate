const CLUB_ACTIONS = {
  LOAD_CLUB: 'load_club',
  LOGOUT: 'logout',
  ADD_SESSION: "add_session",
  EDIT_SESSION: "edit_session",
  ADD_SKATER: "add_skater",
  SESSION_ADD_SKATER: "session_add_skater",
  SESSION_REMOVE_SKATER: "session_remove_skater",
  ADD_GROUP: "add_group",
  REMOVE_GROUP: "remove_group",
  GROUP_ADD_SKATER: "group_add_skater",
  GROUP_REMOVE_SKATER: "group_remove_skater",
};

function buildClub(store) {
  const {
    sessions,
    groups,
    skaterGroupEntries,
    skaterSessionEntries,
    id,
    name,
  } = store;
  function convertArrayToObject(array, key) {
    return array.reduce((obj, entry) => {
      return { ...obj, [entry[key]]: entry };
    }, {});
  }
  const club = {
    sessions: convertArrayToObject(
      sessions.map((session) => ({
        ...session,
        skaters: skaterSessionEntries
          .filter(({ session_id }) => session.id === session_id)
          .map((entry) => entry.skater_id),
      })),
      "id"
    ),
    groups: convertArrayToObject(
      groups.map((group) => ({
        ...group,
        skaters: skaterGroupEntries
          .filter(({ group_id }) => group_id === group.id)
          .map((entry) => entry.skater_id),
      })),
      "id"
    ),
    id,
    name,
  };
  return club;
}

function clubReducer(state, action) {
  const club = { ...state };
  switch (action.type) {
    case CLUB_ACTIONS.LOAD_CLUB:{
      const club = buildClub(action.payload)
      return club
    }

    case CLUB_ACTIONS.LOGOUT:{
      return {}
    }
    case CLUB_ACTIONS.ADD_SESSION: {
      const newSession = action.payload;
      club.sessions = { ...club.sessions, [newSession.id]: newSession };
      return club;
    }
    case CLUB_ACTIONS.EDIT_SESSION: {
      const { id, day, start_time, duration } = action.payload;
      return {
        ...club,
        sessions: {
          ...club.sessions,
          [id]: { ...club.sessions[id], day, start_time, duration },
        },
      };
    }
    case CLUB_ACTIONS.ADD_GROUP: {
      const group = action.payload;
      club.groups = { ...club.groups, [group.id]: group };
      return club;
    }

    case CLUB_ACTIONS.REMOVE_GROUP: {
      const group_id = action.payload;
      const groups = { ...club.groups };
      delete groups[group_id];
      club.groups = { ...groups };
      return club;
    }
    case CLUB_ACTIONS.ADD_SKATER: {
      return club;
    }

    case CLUB_ACTIONS.SESSION_ADD_SKATER: {
      const { session_id, skater_id } = action.payload;
      club.sessions = {
        ...state.sessions,
        [session_id]: {
          ...club.sessions[session_id],
          skaters: [...club.sessions[session_id].skaters, skater_id],
        },
      };

      return club;
    }

    case CLUB_ACTIONS.SESSION_REMOVE_SKATER: {
      const {session_id, skater_id} = action.payload;
      club.sessions = {
        ...state.sessions, [session_id]: {...club.sessions[session_id],skaters: club.sessions[session_id].skaters.filter(id=>id!==skater_id) }
      }
      return club;
    }
    case CLUB_ACTIONS.GROUP_ADD_SKATER: {
      const { group_id, skater_id } = action.payload;
      club.groups = {
        ...club.groups,
        [group_id]: {
          ...club.groups[group_id],
          skaters: [...club.groups[group_id].skaters, parseInt(skater_id)],
        },
      };
      return club;
    }
    case CLUB_ACTIONS.GROUP_REMOVE_SKATER: {
      const { group_id, skater_id } = action.payload;
      club.groups = {
        ...club.groups,
        [group_id]: {
          ...club.groups[group_id],
          skaters: club.groups[group_id].skaters.filter(
            (id) => id !== parseInt(skater_id)
          ),
        },
      };

      return club;
    }
    default:
      return state;
  }
}

export { CLUB_ACTIONS, clubReducer };
