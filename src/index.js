import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./Notifications/NotificationsProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
