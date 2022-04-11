import "./DropDownMenu.css";
import { ReactComponent as LogoSearch } from "../assets/logo_search.svg";
import { ReactComponent as LogoFire } from "../assets/logo_fire.svg";
import { ReactComponent as LogoQuestionMark } from "../assets/logo_questionmark.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function DropDownMenu(props) {
  return (
    <div className={props.dropdown}>
      <div className="container">
        <a>
          <LogoSearch />
          <h2>Explore (Not Available)</h2>
        </a>
        <Link to={"/summon"} onClick={props.closeMenuBar}>
          <LogoFire />
          <h2>Summon</h2>
        </Link>
        <a>
          <LogoQuestionMark />
          <h2>Help (Not Available)</h2>
        </a>
      </div>
    </div>
  );
}

export default DropDownMenu;
