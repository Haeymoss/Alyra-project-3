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
import Proposals from "./Proposals";
import Vote from "./Vote";

const Voter = () => {
  const { address } = useAccount();

  //Get the voters
  const [addressToCheck, setaddressToCheck] = useState(null);
  const {
    data: voters,
    isLoading: votersLoading,
    refetch: refetchVoters,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getVoter",
    account: address,
    args: [addressToCheck],
  });

  return (
    <Flex direction="column" width="100%">
      <Heading as="h1" size="xl" mb="2rem">
        Bonjour chèr(e) Voteur...
      </Heading>
      <Grid templateColumns="1fr 1fr" gap={6} height="100%">
        <Grid templateRows={2} gap={20} height="100%">
          <GridItem colSpan={1} p="1rem">
            <Proposals />
          </GridItem>
        </Grid>
        <GridItem colSpan={1} p="1rem">
          <Vote />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Voter;
