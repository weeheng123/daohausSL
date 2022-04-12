import "./Summon.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import MonarchABI from "../Abis/MolochSummonerABI";

function Summon(props) {
  const address = props.address + " 1";
  const MolochAddress = "0xc33a4efecb11d2cad8e7d8d2a6b5e7feaccc521d";
  const [tokens, setTokens] = useState([
    "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735",
  ]);
  const [votingPeriodLength, setVotingPeriodDuration] = useState("60");
  const [periodDuration, setPeriodDuration] = useState("7200");
  const [gracePeriodLength, setGracePeriodLength] = useState("24");
  const [dilutionBound, setDilutionBound] = useState("3");
  const [proposalDeposit, setProposalDeposit] = useState("5000000000000000000");
  const [processingReward, setProcessingReward] = useState(
    "2000000000000000000"
  );
  const [summonersWithShares, setSummonersWithShares] = useState([
    props.address,
  ]);
  const [shares, setShares] = useState([0]);
  const [summoners, setSummoners] = useState([]);

  //Better if using callback function
  function onChangeTokens(event) {
    setTokens(event.target.value);
    console.log(tokens);
  }
  function onChangePeriodDuration(event) {
    setPeriodDuration(event.target.value);
  }

  function onChangeVotingPeriodLength(event) {
    setVotingPeriodDuration(event.target.value);
  }
  function onChangeGracePeriodLength(event) {
    setGracePeriodLength(event.target.value);
  }
  function onChangeDilutionBound(event) {
    setDilutionBound(event.target.value);
  }
  function onChangeProposalDeposit(event) {
    setProposalDeposit(event.target.value);
  }
  function onChangeProcessingReward(event) {
    setProcessingReward(event.target.value);
  }

  function onChangeSummonersWithShares(event) {
    setSummonersWithShares(event.target.value);
  }

  function stringToArray(str) {
    const removeWhiteSpace = String(str).replace(" ", "");
    const toArray = removeWhiteSpace.split("\n");
    if (toArray !== undefined) {
      for (let i = 0; i < toArray.length; i++) {
        toArray[i] = toArray[i].toLowerCase();
      }
    } else {
      toArray = [str];
    }
    return toArray;
  }

  function summonersToSharesArray(str) {
    const arrayWithAddress = String(str).split(/\s/g);
    var shares = [];
    for (let i = 1; i < arrayWithAddress.length; i += 2) {
      shares.push(arrayWithAddress[i]);
    }
    return shares;
  }

  function summonersToSummonerArray(str) {
    const arrayWithShares = String(str).split(/\s/g);
    var summoners = [];
    for (let i = 0; i < arrayWithShares.length; i += 2) {
      summoners.push(arrayWithShares[i].toLowerCase());
    }
    return summoners;
  }

  async function onCreateMoloch(event) {
    const tokensArray = stringToArray(tokens);
    const sharesArray = summonersToSharesArray(summonersWithShares);
    const summonersArray = summonersToSummonerArray(summonersWithShares);
    setTokens(tokensArray);
    setShares(sharesArray);
    setSummoners(summonersArray);

    try {
      const provider = props.provider;

      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      const MonarchAddress = new ethers.Contract(
        MolochAddress,
        MonarchABI,
        signer
      );

      await MonarchAddress.summonMoloch(
        summonersArray,
        tokensArray,
        periodDuration,
        votingPeriodLength,
        gracePeriodLength,
        ethers.utils.parseUnits(proposalDeposit, "wei"),
        dilutionBound,
        ethers.utils.parseUnits(processingReward, "wei"),
        sharesArray
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="settings">
        <h2>SUMMONING ON: NETWORK</h2>
        <div className="token setting">
          <h2 className="title">TOKEN(S)</h2>
          <h2 className="description">
            What is the primary token contract address? Can whitelist more here
            as well, separated by each line. The first one will be the primary
            token.
          </h2>
          <textarea
            className="settings-textarea"
            value={tokens}
            onChange={onChangeTokens}
          ></textarea>
        </div>
        <div className="token setting">
          <h2 className="title">PERIODS</h2>
          <h2 className="description">How many seconds per period?</h2>
          <input
            className="settings-input"
            value={periodDuration}
            onChange={onChangePeriodDuration}
          ></input>
        </div>
        <div className="token setting">
          <h2 className="title">VOTING</h2>
          <h2 className="description">
            How many periods will the voting period last?
          </h2>
          <input
            className="settings-input"
            value={votingPeriodLength}
            onChange={onChangeVotingPeriodLength}
          ></input>
          <h2 className="description">
            How many periods will the grace period last?
          </h2>
          <input
            className="settings-input"
            value={gracePeriodLength}
            onChange={onChangeGracePeriodLength}
          ></input>
          <h2 className="description">What will be the dilution bound?</h2>
          <input
            className="settings-input"
            value={dilutionBound}
            onChange={onChangeDilutionBound}
          ></input>
        </div>
        <div className="token setting">
          <h2 className="title">DEPOSITS</h2>
          <h2 className="description">
            How much is the proposal deposit (needs to be in wei - 18 decimals)?
          </h2>
          <input
            className="settings-input"
            value={proposalDeposit}
            onChange={onChangeProposalDeposit}
          ></input>
          <h2 className="description">How much is the processing reward?</h2>
          <input
            className="settings-input"
            value={processingReward}
            onChange={onChangeProcessingReward}
          ></input>
        </div>
        <div className="token setting">
          <h2 className="title">SUMMONERS AND STARTING SHARES</h2>
          <h2 className="description">
            Enter one address and amount of shares on each line. Separate
            address and amount with a space. Be sure to include yourself as
            desired.
          </h2>
          <textarea
            className="settings-textarea"
            placeholder={address}
            onChange={onChangeSummonersWithShares}
          ></textarea>
        </div>
        <button className="settings-button" onClick={onCreateMoloch}>
          SUMMON
        </button>
      </div>
    </div>
  );
}

export default Summon;
