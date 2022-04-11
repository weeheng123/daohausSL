import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import DropDownMenu from "../Header/DropDownMenu";
import Main from "../Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Summon from "../Summon/Summon";
import { ethers } from "ethers";

function App() {
  const [dropdown, setDropdown] = useState("no-dropdown");
  const [hasAddress, setHasAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState({ networkId: 0, networkName: "" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const getProvider = async () => {
      if (!window.ethereum) {
        alert("No Metamask detected. Please install.");
      } else {
        await provider.send("eth_requestAccounts", []);
      }
      const ether = provider;

      const accounts = await ether.listAccounts();

      if (accounts !== undefined) {
        setAddress(accounts[0]);
        setHasAddress(true);
      } else {
        setAddress("");
        setHasAddress(false);
      }
    };
    getProvider();

    async function getNetwork() {
      const networkObj = await provider.getNetwork();
      setNetwork({
        networkId: networkObj.chainId,
        networkName: networkObj.name,
      });
    }

    getNetwork();
  }, []);

  async function loginWithEth() {
    if (window.ethereum) {
      const ether = provider;
      try {
        await window.ethereum.enable();
        const accounts = await ether.listAccounts();
        setAddress(accounts[0]);
        setHasAddress(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("No ETH browser extension detected.");
    }
  }

  function onMenuClick() {
    if (dropdown === "no-dropdown") {
      setDropdown("dropdown");
    } else {
      setDropdown("no-dropdown");
    }
  }

  function closeMenuBar() {
    setDropdown("no-dropdown");
  }

  return (
    <React.Fragment>
      <Router>
        <Header
          onMenuClick={onMenuClick}
          loginWithEth={loginWithEth}
          address={address}
          hasAddress={hasAddress}
        />
        <DropDownMenu dropdown={dropdown} closeMenuBar={closeMenuBar} />
        <Routes>
          <Route
            path="/summon"
            element={<Summon address={address} provider={provider} />}
          />
          <Route
            path="/"
            element={<Main address={address} provider={provider} />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
