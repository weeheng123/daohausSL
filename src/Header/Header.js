import "./Header.css";
import { ReactComponent as LogoMenu } from "../assets/logo_menu.svg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header(props) {
  var tempAddress;
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (props.address) {
      if (props.address.length > 20) {
        tempAddress =
          props.address.substr(0, 4) +
          "..." +
          props.address.substr(props.address.length - 4, props.address.length);
      }
      setAddress(tempAddress);
    }
  }, [props.hasAddress]);

  function addressExist() {
    alert("Metamask already connected");
  }
  return (
    <header className="container">
      <div className="left-div">
        <Link to={"/"}>
          <div>
            <h1>Hub</h1>
          </div>
        </Link>
      </div>
      <div className="right-div">
        <div
          className="connect-wallet"
          onClick={props.hasAddress ? addressExist : props.loginWithEth}
        >
          <h1>{props.hasAddress ? address : "Connect Wallet"}</h1>
        </div>
        <button className="menu" onClick={props.onMenuClick}>
          <LogoMenu className="logo-menu" />
        </button>
      </div>
    </header>
  );
}

export default Header;
