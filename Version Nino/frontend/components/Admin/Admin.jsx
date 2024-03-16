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
  Avatar,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
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
import Results from "./Results";

const Admin = () => {
  return (
    <Flex direction="column" width="100%">
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Voters</Tab>
          <Tab>Proposals</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid templateColumns="1fr 1fr 1fr" gap={4} height="100%">
              <GridItem
                colSpan={1}
                p="1rem"
                borderRadius="10px"
                border="solid 1px"
              >
                <Whitelist />
              </GridItem>
              <GridItem
                colSpan={1}
                p="1rem"
                borderRadius="10px"
                border="solid 1px"
              >
                <Workflow />
              </GridItem>
              <GridItem
                colSpan={1}
                p="1rem"
                borderRadius="10px"
                border="solid 1px"
              >
                <Results />
              </GridItem>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Whitelist />
          </TabPanel>
          <TabPanel>
            <Results />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Admin;
