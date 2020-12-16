import React, { useEffect } from "react";
import { NOTE_ACTIONS } from "./NotificationsProvider";

export default function Notification({ id, message, type, dispatch }) {
  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch({ type: NOTE_ACTIONS.REMOVE_NOTE, payload: id }),
      4000
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [id, dispatch]);

  return (
    <div className={`notification-item ${type}`}>
        <p>{message}</p>
    </div>
  );
}
