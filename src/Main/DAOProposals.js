import "./DAOProposals.css";
import React, { useEffect, useState } from "react";

function DAOAddresses(props) {
  const [proposals, setProposals] = useState([]);
  var tempProposals = [];

  useEffect(() => {
    for (var i = 0; i < props.proposals.length; i++) {
      try {
        tempProposals.push(JSON.parse(props.proposals[i].details));
      } catch {
        tempProposals.push(props.proposals[i].details);
      }
    }
    setProposals(tempProposals);
  }, [props.proposals]);

  //More details could be added here, e.g SharesRequested, yesvotes, novotes,
  return (
    <div className="dao-proposals">
      {proposals.map((object, index) => (
        <div className="proposals" key={index} value={object.title}>
          <h2>Title: {object.title}</h2>
          <h2>Proposal Type: {object.proposalType}</h2>
        </div>
      ))}
    </div>
  );
}

export default DAOAddresses;
