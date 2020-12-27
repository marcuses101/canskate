import React, { useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";
import HeaderContent from "./Headers/HeaderContent";
import SkaterEvalHeader from "./Headers/SkaterEvalHeader";
import "./Header.css";

export default function Header({ openNav }) {
  const header = useRef();

  const resize = new ResizeObserver(([entry]) => {
    // borderBoxSize object held in an array in Chrome, not in firefox?
    const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize
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

  return (
    <div ref={header} className="Header">
      <Switch>
        <Route path="/eval/skater/:skater_id">
          <SkaterEvalHeader openNav={openNav} />
        </Route>
        <Route
          path={["/eval/element", "/eval/session/:session_id/group/:group_id"]}
        >
          <HeaderContent
            title="Element Evaluation"
            openNav={openNav}
            showFilter={true}
          />
        </Route>
        <Route path='/eval'>
          <HeaderContent
            title="Evaluation"
            openNav={openNav}
          />
        </Route>
        <Route path='/manage/skater'>
          <HeaderContent
            title="Skater Management"
            openNav={openNav}
          />
        </Route>
        <Route path='/manage/session'>
          <HeaderContent
            title="Session Management"
            openNav={openNav}
          />
        </Route>
        <Route path='/manage'>
          <HeaderContent
          title="Management"
          openNav={openNav}
          />
        </Route>
        <Route path="/distribution">
          <HeaderContent
            title="Distribution"
            openNav={openNav}
            showFilter={true}
          />
        </Route>
        <Route path='/progress'>
          <HeaderContent
            title="Progress"
            openNav={openNav}
            showFilter={false}
          />
        </Route>
        <Route path="/">
          <HeaderContent
            title="Canskate App"
            openNav={openNav}
            showFilter={false}
          />
        </Route>
      </Switch>
    </div>
  );
}
