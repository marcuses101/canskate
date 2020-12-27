import React, { useReducer, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import Notification from "./Notification";
import "./NotificationsProvider.css";

export const NOTE_ACTIONS = {
  ADD_NOTE: "add_note",
  REMOVE_NOTE: "remove_note",
};

export const NotificationContext = React.createContext({
  notificationDispatch() {},
});

function NotificationReducer(notifications, action) {
  switch (action.type) {
    case NOTE_ACTIONS.ADD_NOTE: {
      const newNote = { ...action.payload, id: uuid() };
      return [...notifications, newNote];
    }
    case NOTE_ACTIONS.REMOVE_NOTE: {
      return notifications.filter((note) => note.id !== action.payload);
    }
    default:
      return notifications;
  }
}

export function NotificationsProvider(props) {
  const [notifications, notificationDispatch] = useReducer(
    NotificationReducer,
    []
  );

  return (
    <div>
      <NotificationContext.Provider value={{ notificationDispatch }}>

        <div className="notification-wrapper">
        <TransitionGroup component='div'>
          {notifications.map((note) => {
              return (
                <CSSTransition timeout={200} classNames='fade' key={note.id}>
                  <Notification
                  dispatch={notificationDispatch}
                  actions={NOTE_ACTIONS}
                  {...note}
                />
                </CSSTransition>

              );
            })}
        </TransitionGroup>


        </div>
        {props.children}
      </NotificationContext.Provider>
    </div>
  );
}
