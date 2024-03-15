"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseAbiItem } from "viem";
import { publicClient } from "../utils/client";
import { contractAddress, contractAbi } from "@/constants";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const { address } = useAccount();

  // Fonction for fetching events
  const fetchEvents = async (eventSignature) => {
    return await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem(eventSignature),
      fromBlock: 0n,
      toBlock: "latest",
      account: address,
    });
  };

  // VoterRegistered Events
  const [voterRegisteredEvent, setVoterRegisteredEvent] = useState([]);
  const getVoterRegisteredEvent = async () => {
    const voterRegisteredEvent = await fetchEvents(
      "event VoterRegistered(address voterAddress)"
    );

    setVoterRegisteredEvent(
      voterRegisteredEvent.map((log) => ({
        voterAddress: log.args.voterAddress.toString(),
      }))
    );
  };

  // WorkflowStatusChange Events
  const [workflowStatusChangeEvent, setWorkflowStatusChangeEvent] = useState(
    []
  );
  const getWorkflowStatusChangeEvent = async () => {
    const workflowStatusChangeEvent = await fetchEvents(
      "event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)"
    );

    setWorkflowStatusChangeEvent(
      workflowStatusChangeEvent.map((log) => ({
        previousStatus: log.args.previousStatus.toString(),
        newStatus: log.args.newStatus,
      }))
    );
  };

  // ProposalRegistered Events
  const [proposalRegisteredEvent, setProposalRegisteredEvent] = useState([]);
  const getProposalRegisteredEvent = async () => {
    const proposalRegisteredEvent = await fetchEvents(
      "event ProposalRegistered(uint proposalId)"
    );
    setProposalRegisteredEvent(
      proposalRegisteredEvent.map((log) => ({
        proposalId: log.args.proposalId.toString(),
      }))
    );
  };

  // Voted Events
  const [votedEvent, setVotedEvent] = useState([]);
  const getVotedEvent = async () => {
    const votedEvent = await fetchEvents(
      "event Voted(address voter, uint proposalId)"
    );
    setVotedEvent(
      votedEvent.map((log) => ({
        voter: log.args.voter.toString(),
        proposalId: log.args.proposalId.toString(),
      }))
    );
  };

  // Récupération des events à la connexion
  useEffect(() => {
    const getAllEvents = async () => {
      if (address !== "undefined") {
        await getVoterRegisteredEvent();
        await getWorkflowStatusChangeEvent();
        await getProposalRegisteredEvent();
        await getVotedEvent();
      }
    };
    getAllEvents();
  }, [address]);

  return (
    <EventsContext.Provider
      value={{
        voterRegisteredEvent,
        workflowStatusChangeEvent,
        proposalRegisteredEvent,
        votedEvent,
        getVoterRegisteredEvent,
        getWorkflowStatusChangeEvent,
        getProposalRegisteredEvent,
        getVotedEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within a EventsProvider");
  }
  return context;
};

export default EventsContext;
