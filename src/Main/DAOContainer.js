import "./DAOContainer.css";
import { ReactComponent as LogoDownArrow } from "../assets/logo_downarrow.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import DAOAddresses from "./DAOAddresses";
import DAOOverlay from "./DAOOverlay";

function DAOContainer(props) {
  const [daoNumber, setDAONumber] = useState(0);
  const [molochesArray, setMolochesArray] = useState([]);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayAddress, setOverlayAddress] = useState("");
  const APIURL =
    "https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby";

  const strAddress = props.address.toString();

  const daoQuery = `
      query {
        moloches (where: {summoner: "${strAddress}"}){
          id
      }
    }
  `;

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    const getDAOS = async () => {
      client
        .query({
          query: gql(daoQuery),
        })
        .then((data) => {
          setMolochesArray(data.data.moloches);
          setDAONumber(data.data.moloches.length);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    };

    if (props.address !== "") {
      getDAOS();
    }
  }, [props.address]);

  function showAddressesDiv() {
    setShowAddresses(!showAddresses);
  }

  async function onShowOverlay(address) {
    setShowOverlay(!showOverlay);
    setOverlayAddress(address);
  }

  return (
    <div className="container">
      <div className="dao-container">
        <div className="dao-container-header">
          <h2>Member of {daoNumber} DAOS</h2>
        </div>
        <div className="dao-container-content">
          <h2>Ethereum Rinkeby {daoNumber}</h2>
          <LogoDownArrow className="logo-arrow" onClick={showAddressesDiv} />
        </div>
        {showAddresses ? (
          <DAOAddresses
            molochesArray={molochesArray}
            onShowOverlay={onShowOverlay}
            showOverlay={showOverlay}
          />
        ) : (
          ""
        )}
        <DAOOverlay
          showOverlay={showOverlay}
          overlayAddress={overlayAddress}
          onShowOverlay={onShowOverlay}
          provider={props.provider}
          address={props.address}
        />
      </div>
    </div>
  );
}

export default DAOContainer;
