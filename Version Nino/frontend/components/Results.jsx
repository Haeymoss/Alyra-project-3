import { useContext, useState, useEffect } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import EventsContext from "@/context/Events";

const Results = () => {
  const { proposalRegisteredEvent, votedEvent } = useContext(EventsContext);
  const [proposalVotes, setProposalVotes] = useState([]);

  useEffect(() => {
    // Calculate the number of votes for each proposal
    const calculateVotes = () => {
      const votesCount = {};
      votedEvent.forEach((vote) => {
        const proposalId = vote.proposalId;
        if (!votesCount[proposalId]) {
          votesCount[proposalId] = 1;
        } else {
          votesCount[proposalId]++;
        }
      });
      setProposalVotes(votesCount);
    };

    calculateVotes();
  }, [votedEvent]);

  // Calculate the total number of votes
  const totalVotes = Object.values(proposalVotes).reduce(
    (total, votes) => total + votes,
    0
  );

  return (
    <div>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th pl="0px">Proposal</Th>
            <Th pl="0px">Votes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposalRegisteredEvent.map((proposal, index) => (
            <Tr key={proposal.proposalId}>
              <Td width="80%" p={"1rem"}>
                Proposal n°{proposal.proposalId}
              </Td>
              <Td width="20%" p={"0px"}>
                <Flex alignItems="center">
                  <CircularProgress
                    value={
                      proposalVotes[proposal.proposalId]
                        ? (proposalVotes[proposal.proposalId] / totalVotes) *
                          100
                        : 0
                    }
                    color="green.400"
                    size="50px"
                    thickness="4px"
                    mr="0.5rem"
                    p={"0.5rem"}
                  >
                    <CircularProgressLabel>
                      {proposalVotes[proposal.proposalId]
                        ? (
                            (proposalVotes[proposal.proposalId] / totalVotes) *
                            100
                          ).toFixed(0)
                        : "0"}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* If there are no proposals, display a message */}
      {proposalRegisteredEvent.length === 0 && (
        <Text color="gray.500" mt="1rem">
          There are no proposals registered at the moment as the proposal
          registration period has not yet begun.
        </Text>
      )}
    </div>
  );
};

export default Results;
