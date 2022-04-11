import DAOProposals from "./DAOProposals";

function DAOOverlayContentMain(props) {
  return (
    <div className="dao-page-content">
      <div className="dao-page-content-header">
        <h1>
          Proposals ({props.proposalsLength === 0 ? 0 : props.proposalsLength})
        </h1>
        <button className="create-proposal" onClick={props.onCreateProposal}>
          Create
        </button>
      </div>
      <DAOProposals proposals={props.proposals} />
    </div>
  );
}

export default DAOOverlayContentMain;
