import { useContext, useState, useEffect } from "react";
import {
  Heading,
  List,
  ListItem,
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
      <Heading as="h2" size="lg" mb="1rem" align="center">
        Résultats
      </Heading>
      {proposalRegisteredEvent.map((proposal, index) => (
        <List key={proposal.proposalId}>
          <ListItem>
            <Flex alignItems="center">
              <CircularProgress
                value={
                  proposalVotes[proposal.proposalId]
                    ? (proposalVotes[proposal.proposalId] / totalVotes) * 100
                    : 0
                }
                color="green.400"
                size="100px"
                thickness="4px"
                mr="0.5rem"
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
              Proposal : ID N°{proposal.proposalId}
            </Flex>
          </ListItem>
        </List>
      ))}
    </div>
  );
};

export default Results;
