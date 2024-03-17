"use client";
import { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  useToast,
  Heading,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Modal,
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
import ProposalModal from "../Admin/ProposalModal";

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

      <Grid templateColumns="1fr 1fr 1fr" gap={4} height="100%">
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <Proposals />
        </GridItem>
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <Vote />
        </GridItem>
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <Center h='180px'>
          <ProposalModal />
          </Center>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Voter;
