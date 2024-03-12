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
import Whitelist from "./Whitelist";
import Workflow from "./Workflow";

const Admin = () => {
  return (
    <Flex direction="column" width="100%">
      <Heading as="h1" size="xl" mb="2rem">
        Bonjour chèr(e) administrateur...
      </Heading>
      <Grid templateColumns="1fr 1fr 1fr" gap={4} height="100%">
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <Whitelist />
        </GridItem>
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <Workflow />
        </GridItem>
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <Heading as="h2" size="lg" mb="1rem" align="center">
            Résultats
          </Heading>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Admin;
