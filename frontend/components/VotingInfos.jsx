"use client";

import EventsContext from "@/context/Events";
import ReadFunctionsContext from "@/context/ReadFunctions";
import { Badge, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

const VotingInfos = () => {
  const { voterRegisteredEvent, proposalRegisteredEvent, votedEvent } =
    useContext(EventsContext);
  const { workflowStatus } = useContext(ReadFunctionsContext);
  const [numberOfVoters, setNumberOfVoters] = useState(0);
  const [numberOfProposals, setNumberOfProposals] = useState(0);
  const [numberOfVotes, setNumberOfVotes] = useState(0);

  // Get the number of voters
  useEffect(() => {
    setNumberOfVoters(voterRegisteredEvent.length);
  }, [voterRegisteredEvent]);

  // Get the number of proposals
  useEffect(() => {
    setNumberOfProposals(proposalRegisteredEvent.length);
  }, [proposalRegisteredEvent]);

  // Get the number of votes
  useEffect(() => {
    setNumberOfVotes(votedEvent.length);
  }, [votedEvent]);

  return (
    <div>
      <Heading size="md" mb="1rem" textAlign={"center"}>
        Voting infos
      </Heading>
      <Flex direction="column">
        <Text>
          Current workflow :{" "}
          {
            <Badge colorScheme="twitter" alignSelf={"center"}>
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
                : "Voter Registration"}
            </Badge>
          }
        </Text>
        <Text>
          Registered voters :{" "}
          {
            <Badge colorScheme="twitter" alignSelf={"center"}>
              {numberOfVoters} voters registered
            </Badge>
          }
        </Text>
        <Text>
          Proposals registered :{" "}
          {
            <Badge colorScheme="twitter" alignSelf={"center"}>
              {numberOfProposals} proposals registered
            </Badge>
          }
        </Text>
        <Text>
          Votes casted :{" "}
          {
            <Badge colorScheme="twitter" alignSelf={"center"}>
              {numberOfVotes} votes casted
            </Badge>
          }
        </Text>
      </Flex>
    </div>
  );
};

export default VotingInfos;
