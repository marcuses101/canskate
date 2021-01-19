import React, { useEffect, useRef, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import HeaderContent from "./HeaderContent";
import "./Header.css";
import Context from "../Context";
export default function Header({ loggedIn, clubLoaded }) {
  const {
    club: { name = "" },
  } = useContext(Context);
  const header = useRef();
  const resize = new ResizeObserver(([entry]) => {
    // different ResizeObserver implementations across browsers
    const offset =
      entry?.borderBoxSize?.[0]?.blockSize ||
      entry.borderBoxSize?.blockSize ||
      entry.contentRect.height;
    document.documentElement.style.setProperty(
      "--header-offset",
      `${offset}px`
    );
  });

  useEffect(() => {
    const target = header.current;
    resize.observe(target);
    return () => {
      resize.unobserve(target);
    };
  });

  if (!loggedIn) {
    return (
      <div ref={header} className="Header">
        <HeaderContent title="Canskate App" hideMenu={true} />
      </div>
    );
  }

  if (!clubLoaded) {
    return (
      <div ref={header} className="Header">
        <HeaderContent title="Canskate App" hideMenu={false} />
      </div>
    );
  }

  return (
    <div ref={header} className="Header">
      <Switch>
        <Route path="/eval/skater/:skater_id">
          <HeaderContent showFilter={true} />
        </Route>
        <Route path="/eval/session/:session_id/group/:group_id">
          <HeaderContent title="Group Evaluation" showFilter={true} />
        </Route>
        <Route path="/eval/element">
          <HeaderContent title="Club Evaluation" showFilter={true} />
        </Route>
        <Route path="/eval">
          <HeaderContent title="Evaluation" />
        </Route>
        <Route path="/manage/skater">
          <HeaderContent title="Skater Management" />
        </Route>
        <Route path="/manage/session">
          <HeaderContent title="Session Management" />
        </Route>
        <Route path="/manage">
          <HeaderContent title="Management" />
        </Route>
        <Route path="/distribution">
          <HeaderContent title="Distribution" showFilter={true} />
        </Route>
        <Route path="/progress/skater/:skater_id">
          <HeaderContent />
        </Route>
        <Route path="/progress">
          <HeaderContent title="Progress" showFilter={false} />
        </Route>
        <Route path="/">
          <HeaderContent title={name || "Canskate App"} showFilter={false} />
        </Route>
      </Switch>
    </div>
  );
}
