"use client";
import { useContext, useState } from "react";
import {
  Flex,
  Input,
  Button,
  useToast,
  Heading,
  Alert,
  AlertIcon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
  const { votedEvent, getVotedEvent, voterRegisteredEvent } =
    useContext(EventsContext);

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
      <Heading as="h3" size="sm" mb="1rem">
        Make your vote
      </Heading>
      <Flex>
        <Input
          value={voteId}
          onChange={(e) => setVoteId(e.target.value)}
          placeholder="Proposal ID"
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
      <Table variant="striped" mt={"2rem"}>
        <Thead>
          <Tr>
            <Th pl={"0px"}>Voter</Th>
            <Th pl={"0px"}>Proposal voted</Th>
          </Tr>
        </Thead>
        <Tbody>
          {votedEvent.map((vote, index) => (
            <Tr key={index}>
              <Td width="70%">{vote.voter}</Td>
              <Td width="30%">Proposal n°{vote.proposalId}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {votedEvent.length === 0 && (
        <Text color="gray.500" mt="1rem">
          No one has voted yet.
        </Text>
      )}
    </div>
  );
};

export default Vote;
