"use client";
import { useEffect, useState } from "react";
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

const Whitelist = () => {
  const { address } = useAccount();
  const toast = useToast();

  //Add Voter
  const [registeredAddress, setRegisteredAddress] = useState("");
  const {
    data: hash,
    error: addVoterError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "L'électeur a été ajouté avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setRegisteredAddress(""); // Réinitialiser la valeur de l'input
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

  const addVoter = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "addVoter",
      account: address,
      args: [registeredAddress],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt(hash);

  // Events
  const [voterAddedEvent, setvoterAddedEvent] = useState([]);

  const getVoterAddedEvent = async () => {
    const fetchEvents = async (eventSignature) => {
      return await publicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem(eventSignature),
        fromBlock: 0n,
        toBlock: "latest",
        account: address,
      });
    };

    const voterAddedEvent = await fetchEvents(
      "event VoterRegistered(address voterAddress)"
    );

    setvoterAddedEvent(
      voterAddedEvent.map((log) => ({
        voterAddress: log.args.voterAddress.toString(),
      }))
    );
  };

  useEffect(() => {
    const getAllEvents = async () => {
      if (address !== "undefined") {
        await getVoterAddedEvent();
      }
    };
    getAllEvents();
  }, [address, voterAddedEvent]);

  return (
    <div>
      <Heading as="h2" size="lg" mb="2rem" align="center">
        Whitelist
      </Heading>
      <Heading as="h3" size="sm" mb="1rem">
        Ajouter un électeur
      </Heading>
      <Flex>
        <Input
          placeholder="Addresse"
          value={registeredAddress}
          onChange={(e) => {
            setRegisteredAddress(e.target.value);
          }}
          mr="0.5rem"
        />
        <Button disabled={isPending} onClick={addVoter}>
          {isPending ? "Confirming..." : "Ajouter"}{" "}
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
        {addVoterError && (
          <Alert status="error" mt="1rem" mb="1rem">
            <AlertIcon />
            Error: {addVoterError.shortMessage || addVoterError.message}
          </Alert>
        )}
      </Flex>
      <Heading as="h3" size="sm" mt="2rem">
        Liste des électeurs
      </Heading>
      {voterAddedEvent.map((voter, index) => (
        <List spacing={3} key={crypto.randomUUID()}>
          <ListItem>{voter.voterAddress}</ListItem>
        </List>
      ))}
    </div>
  );
};

export default Whitelist;
