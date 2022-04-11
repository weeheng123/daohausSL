import React, { useEffect, useState } from "react";
import "./DAOOverlay.css";
import { ReactComponent as LogoCross } from "../assets/logo_cross.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import DAOCreateProposal from "./DAOCreateProposal";
import DAOOverlayContentMain from "./DAOOverlayContentMain";

function DAOOverlay(props) {
  const [proposals, setProposals] = useState("");
  const [createProposal, setCreateProposal] = useState(false);

  const APIURL =
    "https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby";

  const strAddress = props.overlayAddress.toString();

  const proposalQuery = `
      query {
        proposals (where: {molochAddress: "${strAddress}"}){
                proposalId
                details
                sharesRequested
                createdBy
                yesVotes
                noVotes
      }
    }
  `;

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    if (props.showOverlay === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const getProposals = async () => {
      client
        .query({
          query: gql(proposalQuery),
        })
        .then((data) => {
          setProposals(data.data.proposals);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    };

    if (props.overlayAddress !== "") {
      getProposals();
    }
  }, [props.overlayAddress]);

  function onCreateProposal() {
    setCreateProposal(!createProposal);
  }

  return (
    <React.Fragment>
      {props.showOverlay ? (
        <div className="dao-overlay">
          <div className="dao-page-container">
            <div className="dao-page-header">
              {createProposal ? (
                <h1 className="back-button" onClick={onCreateProposal}>
                  Back
                </h1>
              ) : (
                ""
              )}
              <h1>DAO Address: {props.overlayAddress}</h1>
              <LogoCross className="logo-cross" onClick={props.onShowOverlay} />
            </div>
            {createProposal ? (
              <DAOCreateProposal
                provider={props.provider}
                overlayAddress={props.overlayAddress}
                address={props.address}
              />
            ) : (
              <DAOOverlayContentMain
                proposalsLength={proposals.length}
                proposals={proposals}
                onCreateProposal={onCreateProposal}
              />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default DAOOverlay;
