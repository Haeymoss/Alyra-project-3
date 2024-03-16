"use client";
import { useContext, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  useToast,
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
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
} from "wagmi";
import { parseAbiItem } from "viem";
import { contractAddress, contractAbi } from "@/constants";
import { publicClient } from "../../utils/client";
import EventsContext from "@/context/Events";

const Vote = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { votedEvent, getVotedEvent } = useContext(EventsContext);

  // setVote
  const [voteId, setVoteId] = useState("");
  const {
    data: hash,
    error: voteError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Le vote a été réalisé avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getVotedEvent();
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

  const setVote = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "setVote",
      account: address,
      args: [voteId],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt(hash);

  return (
    <div>
      {" "}
      <Heading as="h2" size="lg" mb="2rem" align="center">
        Voter pour une proposition
      </Heading>
      <Heading as="h3" size="sm" mb="1rem">
        Choisir un vote
      </Heading>
      <Flex>
        <Input
          value={voteId}
          onChange={(e) => setVoteId(e.target.value)}
          placeholder="ID du vote"
          mr="2"
        />
        <Button
          onClick={setVote}
          isLoading={isConfirming}
          loadingText="En cours"
        >
          Voter
        </Button>
      </Flex>
      <Flex direction="column">
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
        {voteError && (
          <Alert status="error" mt="1rem" mb="1rem">
            <AlertIcon />
            Error: {voteError.shortMessage || voteError.message}
          </Alert>
        )}
      </Flex>
      <Heading as="h3" size="sm" mt="2rem">
        Vote réalisé
      </Heading>
      {votedEvent.map((vote, index) => (
        <List spacing={3} key={crypto.randomUUID()}>
          <ListItem>
            {vote.voter} à voter pour la proposition N°
            {vote.proposalId}
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default Vote;
