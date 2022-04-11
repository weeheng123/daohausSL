import HausTokenContainer from "./HausTokenContainer";
import DAOContainer from "./DAOContainer";
import React from "react";

function Main(props) {
  return (
    <React.Fragment>
      <DAOContainer address={props.address} provider={props.provider} />
      <HausTokenContainer />
    </React.Fragment>
  );
}

export default Main;
