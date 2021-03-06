import { useContext } from "react";
import {
  NOTE_ACTIONS,
  NotificationContext,
} from "../Notifications/NotificationsProvider";

export function useToast() {
  const { notificationDispatch } = useContext(NotificationContext);
  return function (payload) {
    notificationDispatch({ type: NOTE_ACTIONS.ADD_NOTE, payload: payload });
  };
}
