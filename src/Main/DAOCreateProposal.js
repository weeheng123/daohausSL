import React, { useState, useEffect } from "react";
import "./DAOCreateProposal.css";
import MonarchContractABI from "../Abis/MolochContractABI";
import DAITokenABI from "../Abis/DAITokenABI";
import { ethers } from "ethers";

function DAOCreateProposal(props) {
  const [proposalTitle, setProposalTitle] = useState("");
  const [sharesRequested, setSharesRequested] = useState("");
  const [tributeOffered, setTributeOffered] = useState("");
  const DAITokenAddress = "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735";
  const DAIWad =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  function onChangeProposalTitle(event) {
    setProposalTitle(event.target.value);
  }

  function onChangeSharesRequested(event) {
    setSharesRequested(event.target.value);
  }

  function onChangeTributeOffered(event) {
    setTributeOffered(event.target.value);
  }

  async function onCreateProposal(event) {
    try {
      const provider = props.provider;

      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      const MonarchContract = new ethers.Contract(
        props.overlayAddress,
        MonarchContractABI,
        signer
      );

      const details = `
      {"title":"${proposalTitle}","link":"daolink.club","proposalType":"Member Proposal"}
      `;
      await MonarchContract.submitProposal(
        props.address,
        sharesRequested,
        "0",
        tributeOffered,
        DAITokenAddress,
        "0",
        DAITokenAddress,
        details
      );
    } catch (error) {
      alert(error.error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    async function getTokenPermission() {
      try {
        const provider = props.provider;

        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        const DAIContract = new ethers.Contract(
          DAITokenAddress,
          DAITokenABI,
          signer
        );

        const allowance = await DAIContract.allowance(
          props.address,
          props.overlayAddress
        );

        const strAllowance = allowance.toString();

        console.log(strAllowance);

        if (strAllowance === "0") {
          await DAIContract.approve(props.overlayAddress, DAIWad);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getTokenPermission();
  }, [props.overlayAddress]);

  return (
    <div className="dao-create-proposal">
      <h1 className="dao-create-proposal-header">
        Create Proposal(Request Shares For Tokens)
      </h1>
      <div className="proposal-parameters">
        <h2>TITLE</h2>
        <input
          placeholder="Proposal Title"
          value={proposalTitle}
          onChange={onChangeProposalTitle}
        />
        <h2>SHARES REQUESTED</h2>
        <input
          placeholder="0"
          value={sharesRequested}
          onChange={onChangeSharesRequested}
        />
        <h2>TRIBUTE OFFERED</h2>
        <input
          placeholder="0"
          value={tributeOffered}
          onChange={onChangeTributeOffered}
        />
        <button onClick={onCreateProposal}>Create Proposal</button>
      </div>
    </div>
  );
}

export default DAOCreateProposal;
