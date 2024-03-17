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
import { contractAddress, contractAbi } from "@/constants";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import ReadFunctionsContext from "@/context/ReadFunctions";
import ProposalModal from "./ProposalModal";

const Workflow = () => {
  const { address } = useAccount();
  const { ownerAddress, workflowStatus, refetchWorkflowStatus } =
    useContext(ReadFunctionsContext);
  const toast = useToast();
  const steps = [
    { title: "Voter Registration", description: "Workflow 0" },
    {
      title: "Registration of proposals",
      description: "Workflow 1",
    },
    {
      title: "End of proposal registration",
      description: "Workflow 2",
    },
    { title: "Voting session", description: "Workflow 3" },
    {
      title: "End of voting session",
      description: "Workflow 4",
    },
    { title: "Tallying of votes", description: "Workflow 5" },
  ];

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
        refetchWorkflowStatus();
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

  // Next workflow function
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
    } else {
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
      <Heading size="md" mb="1rem" textAlign={"center"}>
        Workflow
      </Heading>
      <Flex direction="column">
        <Box mb="2rem">
          <Stepper
            index={workflowStatus}
            orientation="vertical"
            height="350px"
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

        {workflowStatus === 5 ? (
          <ProposalModal />
        ) : (
          address === ownerAddress && (
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              onClick={handleNextWorkflow}
            >
              Move on to the next workflow
            </Button>
          )
        )}
      </Flex>
    </div>
  );
};

export default Workflow;
