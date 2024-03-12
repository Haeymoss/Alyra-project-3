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
    <Flex direction="column">
      <Heading as="h1" size="xl" mb="2rem">
        Bonjour chèr(e) administrateur...
      </Heading>
      <Flex>
        <Input
          placeholder="Chek the Address"
          onChange={(e) => setaddressToCheck(e.target.value)}
          onSubmit={refetchVoters}
        />
      </Flex>
      <Flex>
        <Text>{voters?.toString()}</Text>
      </Flex>
    </Flex>
  );
};

export default Voter;
