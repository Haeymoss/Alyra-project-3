"use client";
import { useState } from "react";
import { Flex, Heading, Grid, GridItem } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useReadContract, useAccount } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import Proposals from "./Proposals";
import Vote from "./Vote";
import VotingInfos from "../VotingInfos";
import Workflow from "../Admin/Workflow";

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
    <Flex direction="column" width="100%" alignItems="center">
      <Heading size="xl" mb="2rem">
        Voter Dashboard
      </Heading>
      <Grid
        templateColumns="2fr 1fr"
        templateRows="1fr auto"
        gap={4}
        width="1200px"
      >
        {/* Proposals & Votes */}
        <GridItem p="1rem" borderRadius="0.5rem" border="solid 1px" rowSpan={5}>
          <Tabs>
            <TabList>
              <Tab>Make proposals</Tab>
              <Tab>Vote your way</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="1rem" mt="1rem">
                <Proposals />
              </TabPanel>
              <TabPanel p="1rem" mt="1rem">
                <Vote />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>

        {/* Voting Infos */}
        <GridItem colSpan={1} p="1rem" borderRadius="10px" border="solid 1px">
          <VotingInfos />
        </GridItem>

        {/* Workflow */}
        <GridItem
          colSpan={1}
          rowSpan={4}
          p="1rem"
          borderRadius="10px"
          border="solid 1px"
        >
          <Workflow />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Voter;
