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
  Badge,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Workflow = () => {
  const { address } = useAccount();
  const toast = useToast();

  //Get workflowStatus
  const { data: workflowStatus } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "workflowStatus",
  });

  const { data: hash, isPending, writeContract } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Le workflow a été mis à jour avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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

  //Handle states
  return (
    <div>
      <Heading as="h2" size="lg" mb="2rem" align="center">
        Workflow
      </Heading>
      <Heading as="h3" size="sm" mb="1rem">
        Workflow actuel
      </Heading>
      <Badge
        fontSize="lg"
        width="100%"
        align="center"
        padding="5px"
        variant="outline"
        colorScheme="green"
      >
        {workflowStatus === 0
          ? "Enregistrement des électeurs"
          : workflowStatus === 1
          ? "Enregistrement des propositions en cours"
          : workflowStatus === 2
          ? "Enregistrement des propositions terminées"
          : workflowStatus === 3
          ? "Session de vote en cours"
          : workflowStatus === 4
          ? "Session de vote terminée"
          : workflowStatus === 5
          ? "Comptabilisation des votes"
          : "Erreur"}
      </Badge>
      <Divider orientation="horizontal" mt="1rem" mb="1rem" />
      <Heading as="h3" size="sm" mb="1rem">
        Liste des workflows
      </Heading>
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Workflows</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>0</Td>
              <Td>
                {workflowStatus === 0 ? (
                  <Badge colorScheme="green">
                    Enregistrement des électeurs
                  </Badge>
                ) : (
                  <Badge>Enregistrement des électeurs</Badge>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>
                {workflowStatus === 1 ? (
                  <Badge colorScheme="green">
                    Enregistrement des propositions en cours
                  </Badge>
                ) : (
                  <Badge>Enregistrement des propositions en cours</Badge>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>
                {workflowStatus === 2 ? (
                  <Badge colorScheme="green">
                    Enregistrement des propositions terminées
                  </Badge>
                ) : (
                  <Badge>Enregistrement des propositions terminées</Badge>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>
                {workflowStatus === 3 ? (
                  <Badge colorScheme="green">Session de vote en cours</Badge>
                ) : (
                  <Badge>Session de vote en cours</Badge>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>
                {workflowStatus === 4 ? (
                  <Badge colorScheme="green">Session de vote terminée</Badge>
                ) : (
                  <Badge>Session de vote terminée</Badge>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>
                {workflowStatus === 5 ? (
                  <Badge colorScheme="green">Comptabilisation des votes</Badge>
                ) : (
                  <Badge>Comptabilisation des votes</Badge>
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider orientation="horizontal" mt="1rem" mb="1rem" />
      <Heading as="h3" size="sm" mb="1rem">
        Passer au workflow suivant
      </Heading>
      <Button rightIcon={<ArrowForwardIcon />} width="100%" colorScheme="blue" onClick={startProposalsRegistering}>
        {/* {workflowStatus === 0
          ? "Enregistrement des propositions"
          : workflowStatus === 1
          ? "Fin de l'enregistrement des propositions"
          : workflowStatus === 2
          ? "Début de la session de vote"
          : workflowStatus === 3
          ? "Fin de la session de vote"
          : workflowStatus === 4
          ? "Comptabilisation des votes"
          : "Erreur"} */}
      </Button>
    </div>
  );
};

export default Workflow;