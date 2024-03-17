"use client";
import { Flex, Heading, Grid, GridItem } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Whitelist from "./Whitelist";
import Workflow from "./Workflow";
import Results from "../Results";
import VotingInfos from "../VotingInfos";

const Admin = () => {
  return (
    <Flex direction="column" width="100%" alignItems="center">
      <Heading size="xl" mb="2rem">
        Admin Dashboard
      </Heading>
      <Grid
        templateColumns="2fr 1fr"
        templateRows="1fr auto"
        gap={4}
        width="1200px"
      >
        {/* Whitelist & proposals */}
        <GridItem p="1rem" borderRadius="0.5rem" border="solid 1px" rowSpan={5}>
          <Tabs>
            <TabList>
              <Tab>Manage Voters</Tab>
              <Tab>See proposals & results</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="1rem" mt="1rem">
                <Whitelist />
              </TabPanel>
              <TabPanel p="1rem">
                <Results />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        {/* Vote infos */}
        <GridItem
          p="1rem"
          borderRadius="0.5rem"
          border="solid 1px"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <VotingInfos />
        </GridItem>
        {/* Workflow */}
        <GridItem
          colSpan={1}
          rowSpan={4}
          p="1rem"
          borderRadius="0.5rem"
          border="solid 1px"
        >
          <Workflow />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Admin;

{
  /* <Grid templateColumns="1fr 1fr 1fr" gap={4} height="100%">
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
                </Grid> */
}
