"use client";
import ReadFunctionsContext from "@/context/ReadFunctions";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext, useEffect, useState } from "react";

const NotConnected = () => {
  const { workflowStatus, votedEvent } = useContext(ReadFunctionsContext);

  const numberOfVoters =
    votedEvent && votedEvent.length > 0
      ? new Set(votedEvent.map((vote) => vote.voter)).size
      : 0;

  return (
    <Flex direction="column" width="100%" pl="5rem" pr="5rem">
      <Flex alignItems="center">
        {/* <EmailIcon /> */}
        <Heading as="h2" size="lg" align="center" mb="1.5rem">
          Let's go vote
        </Heading>
      </Flex>
      <Flex>
        <Flex direction="column">
          <Heading size="sm">Current workflow</Heading>
          <Badge colorScheme="twitter" mt="0.5rem">
            {workflowStatus === 0
              ? "Voter Registration"
              : workflowStatus === 1
              ? "Registration of proposals"
              : workflowStatus === 2
              ? "End of proposal registration"
              : workflowStatus === 3
              ? "Voting session"
              : workflowStatus === 4
              ? "End of voting session"
              : workflowStatus === 4
              ? "Tallying of votes"
              : "Workflow ended"}
          </Badge>
        </Flex>
        <Flex direction="column" ml="2rem">
          <Heading size="sm">Registered voters</Heading>
          <Badge colorScheme="twitter" mt="0.5rem">
            {numberOfVoters} voters registered
          </Badge>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        background="ActiveBorder"
        height="586px"
        borderRadius="0.2rem"
        mt="3rem"
      >
        <Image
          borderRadius="full"
          boxSize="10rem"
          src="/logovotingDapp.png"
          alt="Logo Voting DApp"
        />
        <Heading size="md" mt="2rem">
          Please, connect your wallet
        </Heading>
        <Text mt="0.5rem" mb="2rem">
          Please connect your wallet to regsiter proposals, vote and see the
          results.
        </Text>
        <ConnectButton
          accountStatus="avatar"
          chainStatus="name"
          showBalance={true}
          label="Connect wallet"
        />
      </Flex>

      {/* <Alert status="warning">
        <AlertIcon />
        Please connect your Wallet.
      </Alert> */}
    </Flex>
  );
};

export default NotConnected;
