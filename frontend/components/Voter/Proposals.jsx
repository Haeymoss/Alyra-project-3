"use client";
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  Flex,
  Text,
  Input,
  Button,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

import { parseAbiItem } from "viem";
import { contractAddress, contractAbi } from "@/constants";
import { publicClient } from "../../utils/client";
import EventsContext from "@/context/Events";
import Results from "../Results";

const Proposals = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { proposalRegisteredEvent, getProposalRegisteredEvent } =
    useContext(EventsContext);

  // addProposal
  const [proposition, setProposition] = useState("");

  const {
    data: hash,
    error: addProposalError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "La proposition a été ajoutée avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setProposition("");
        getProposalRegisteredEvent();
      },
      onError: (error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });

  const addProposal = async () => {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "addProposal",
      args: [proposition],
      account: address,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt(hash);

  return (
    <div>
      <Heading as="h3" size="sm" mb="1rem">
        Register one proposal or more
      </Heading>
      <Flex>
        <Input
          placeholder="Write a proposition"
          value={proposition}
          onChange={(e) => {
            setProposition(e.target.value);
          }}
          mr="0.5rem"
        />
        <Button disabled={isPending} onClick={addProposal}>
          {isPending ? "Confirming..." : "Add"}
        </Button>
      </Flex>
      <Flex direction="column" mb={"2rem"}>
        {hash && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Hash de la dernière transaction : {hash.substring(0, 6)}...
            {hash.substring(hash.length - 4)}
          </Alert>
        )}
        {isConfirming && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Waiting for confirmation...
          </Alert>
        )}
        {isConfirmed && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Transaction confirmed.
          </Alert>
        )}
        {addProposalError && (
          <Alert status="error" mt="1rem" mb="1rem">
            <AlertIcon />
            Error: {addProposalError.shortMessage || addProposalError.message}
          </Alert>
        )}
      </Flex>
      <Results />
    </div>
  );
};

export default Proposals;
