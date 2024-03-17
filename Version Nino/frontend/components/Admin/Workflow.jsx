import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Badge,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  StepIcon,
  StepNumber,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  useSteps,
  Step,
  Stepper,
  StepTitle,
  StepDescription,
  StepIndicator,
  StepStatus,
  StepSeparator,
} from "@chakra-ui/react";
import EventsContext from "@/context/Events";
import { contractAddress, contractAbi } from "@/constants";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import ProposalModal from "./ProposalModal";

const Workflow = () => {
  const { address } = useAccount();
  const toast = useToast();
  const steps = [
    { title: "Enregistrement des électeurs", description: "Register Voters" },
    {
      title: "Enregistrement des propositions",
      description: "Register Proposals",
    },
    {
      title: "Fin de l'enregistrement des propositions",
      description: "End of Registration of Proposals",
    },
    { title: "Session de vote", description: "Voting Session" },
    {
      title: "Fin de la session de vote",
      description: "End of Voting Session",
    },
    { title: "Comptabilisation des votes", description: "Vote Tallying" },
  ];

  // Récupération du smart contract
  // Write the workflow status
  const {
    data: hash,
    error: changedWorkflowError,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Le workflow a été mis à jour avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch();
      },
      onError: (error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });

  const startProposalsRegistering = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "startProposalsRegistering",
      account: address,
    });
  };

  const endProposalsRegistering = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "endProposalsRegistering",
      account: address,
    });
  };

  const startVotingSession = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "startVotingSession",
      account: address,
    });
  };

  const endVotingSession = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "endVotingSession",
      account: address,
    });
  };

  const tallyVotes = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "tallyVotes",
      account: address,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt(hash);

  // Read the workflow status
  const {
    data: workflowStatus,
    error: getWorkflowStatusError,
    isPending: getWorflowStatusIsPending,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "workflowStatus",
  });

  const handleNextWorkflow = async () => {
    const workflowFunctions = [
      startProposalsRegistering,
      endProposalsRegistering,
      startVotingSession,
      endVotingSession,
      tallyVotes,
    ];

    const currentWorkflowFunction = workflowFunctions[workflowStatus];



    if (currentWorkflowFunction) {
      try {
        await currentWorkflowFunction();
      } catch (error) {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
     else {
      toast({
        title: "Vous avez atteint le dernier workflow.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <div>
      <Heading as="h2" size="lg" mb="2rem" align="center">
        Workflow
      </Heading>
      <Flex direction="column">
        {hash && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Hash de la dernière transaction : {hash.substring(0, 6)}...
            {hash.substring(hash.length - 4)}
          </Alert>
        )}
        {isConfirming && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Waiting for confirmation...
          </Alert>
        )}
        {isConfirmed && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Transaction confirmed.
          </Alert>
        )}
        {changedWorkflowError && (
          <Alert status="error" mt="1rem" mb="1rem">
            <AlertIcon />
            Error:{" "}
            {changedWorkflowError.shortMessage || changedWorkflowError.message}
          </Alert>
        )}
      </Flex>
      <Flex direction="column" alignItems="center">
        <Box mb="2rem">
          <Stepper
            index={workflowStatus}
            orientation="vertical"
            height="400px"
            gap="0"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>

        {workflowStatus === 5  ? (
            <ProposalModal />

        ) : (
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            onClick={handleNextWorkflow}
          >
            Passer au workflow suivant
          </Button>
        )}


      </Flex>
      <Divider orientation="horizontal" mt="1rem" mb="1rem" />
    </div>
  );
};

export default Workflow;
