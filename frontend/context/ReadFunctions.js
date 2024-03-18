"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { parseAbiItem } from "viem";
import { publicClient } from "../utils/client";
import { contractAddress, contractAbi } from "@/constants";

const ReadFunctionsContext = createContext();

export const ReadFunctionsProvider = ({ children }) => {
  const { address } = useAccount();

  // Read the owner of the contract
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "owner",
  });

  // Read the workflow status
  const {
    data: workflowStatus,
    error: getWorkflowStatusError,
    isPending: getWorflowStatusIsPending,
    refetch: refetchWorkflowStatus,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "workflowStatus",
  });

  // Read the winner of the vote
  const { data: winner , refetch: refetchWinningProposalId} = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "winningProposalID",
  });

  return (
    <ReadFunctionsContext.Provider
      value={{
        ownerAddress,
        workflowStatus,
        refetchWorkflowStatus,
        refetchWinningProposalId,
        winner,
      }}
    >
      {children}
    </ReadFunctionsContext.Provider>
  );
};

export const useReadFunctions = () => {
  return useContext(ReadFunctionsContext);
};

export default ReadFunctionsContext;
