import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

export default function SideNav({ open, closeNav, logout, clubLogout, clubLoaded }) {
  const sidenav = useRef(null);

  // close nav on click outside
  useEffect(() => {
    function logClickInside(event) {
      if (!sidenav.current.contains(event.target)) {
        event.stopPropagation();
        closeNav();
      }
    }
    if (open) {
      document.addEventListener("click", logClickInside, { capture: true });
      document.body.classList.add("blur");
    } else {
      document.removeEventListener("click", logClickInside, { capture: true });
      document.body.classList.remove("blur");
    }
    return () =>
      document.removeEventListener("click", logClickInside, { capture: true });
  }, [open, closeNav]);

  return (
    <nav className={`SideNav ${open ? "open" : "closed"}`} ref={sidenav}>
      <ul className="links">
        <li onClick={closeNav}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={closeNav}>
          <Link to="/eval">Evaluate</Link>
        </li>
        <li onClick={closeNav}>
          <Link to="/progress">Progress</Link>
        </li>
        <li onClick={closeNav}>
          <Link to="/distribution">Distribution</Link>
        </li>
        <li onClick={closeNav}>
          <Link to="/manage">Manage</Link>
        </li>
        <li onClick={closeNav}>
          <ul>
            {clubLoaded && <li><button onClick={clubLogout}>Change club</button></li>}
            <li><button onClick={logout}>Logout</button></li>
          </ul>

        </li>
      </ul>
    </nav>
  );
}
