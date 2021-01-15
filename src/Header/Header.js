import React, { useEffect, useRef, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import HeaderContent from "./HeaderContent";
import "./Header.css";
import Context from "../Context";
export default function Header({ openNav, loggedIn, clubLoaded }) {
  const {
    club: { name = "" },
  } = useContext(Context);
  const header = useRef();
  const resize = new ResizeObserver(([entry]) => {
    // borderBoxSize object held in an array in Chrome, not in firefox?
    const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize;
    const offset = borderBoxSize.blockSize;
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
        <HeaderContent title="Canskate App" hideMenu={false} openNav={openNav}/>
      </div>
    );
  }

  return (
    <div ref={header} className="Header">
      <Switch>
        <Route path="/eval/skater/:skater_id">
        <HeaderContent openNav={openNav} showFilter={true}/>
        </Route>
        <Route path='"/eval/session/:session_id/group/:group_id"'>
          <HeaderContent
            title="Group Evaluation"
            openNav={openNav}
            showFilter={true}
          />
        </Route>
        <Route
          path="/eval/element"
        >
          <HeaderContent
            title="Club Evaluation"
            openNav={openNav}
            showFilter={true}
          />
        </Route>
        <Route path="/eval">
          <HeaderContent title="Evaluation" openNav={openNav} />
        </Route>
        <Route path="/manage/skater">
          <HeaderContent title="Skater Management" openNav={openNav} />
        </Route>
        <Route path="/manage/session">
          <HeaderContent title="Session Management" openNav={openNav} />
        </Route>
        <Route path="/manage">
          <HeaderContent title="Management" openNav={openNav} />
        </Route>
        <Route path="/distribution">
          <HeaderContent
            title="Distribution"
            openNav={openNav}
            showFilter={true}
          />
        </Route>
        <Route path="/progress/skater/:skater_id">
          <HeaderContent openNav={openNav} />
        </Route>
        <Route path="/progress">
          <HeaderContent
            title="Progress"
            openNav={openNav}
            showFilter={false}
          />
        </Route>
        <Route path="/">
          <HeaderContent
            title={name || "Canskate App"}
            openNav={openNav}
            showFilter={false}
          />
        </Route>
      </Switch>
    </div>
  );
}
