import React from "react";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import NavCss from "../styles/Nav.module.css";

function Nav() {

  return (
    <div className={NavCss.container}>
      <div>
        <NavLink to={"/"}>
          <button className={NavCss.btn}>Landing</button>
        </NavLink>
        <NavLink to={"/home"}>
          <button className={NavCss.btn}>Home</button>
        </NavLink>
        <NavLink to="/form">
          <button className={NavCss.btn}>Create Dog</button>
        </NavLink>
      </div>

      <SearchBar />
    </div>
  );
}

export default Nav;
