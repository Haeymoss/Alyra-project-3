"use client";
import { useContext, useState } from "react";
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
  List,
  ListItem,
  ListIcon,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import EventsContext from "@/context/Events";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Whitelist = () => {
  const { address } = useAccount();
  const toast = useToast();
  const { voterRegisteredEvent, getVoterRegisteredEvent } =
    useContext(EventsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Add Voter
  const [registeredAddress, setRegisteredAddress] = useState("");

  const {
    data: hash,
    error: addVoterError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "L'électeur a été ajouté avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setRegisteredAddress("");
        getVoterRegisteredEvent();
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
  const addVoter = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "addVoter",
      account: address,
      args: [registeredAddress],
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt(hash);

  return (
    <div>
      <Flex mb="1rem">
        <Heading as="h3" size="sm">
          Register a voter
        </Heading>
        <InfoOutlineIcon
          alignSelf="center"
          ml="0.5rem"
          onMouseOver={onOpen}
          onClick={onOpen}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="fit-content">
            <ModalHeader>Addresses for test</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <List>
                <ListItem>0x70997970C51812dc3A010C7d01b50e0d17dc79C8</ListItem>
                <ListItem>0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC</ListItem>
                <ListItem>0x90F79bf6EB2c4f870365E785982E1f101E93b906</ListItem>
                <ListItem>0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65</ListItem>
                <ListItem>0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc</ListItem>
                <ListItem>0x976EA74026E726554dB657fA54763abd0C3a0aa9</ListItem>
                <ListItem>0x14dC79964da2C08b23698B3D3cc7Ca32193d9955</ListItem>
              </List>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex>
        <Input
          placeholder="Address : 0x..."
          value={registeredAddress}
          onChange={(e) => {
            setRegisteredAddress(e.target.value);
          }}
          mr="0.5rem"
        />
        <Button disabled={isPending} onClick={addVoter}>
          {isPending ? "Confirming..." : "Ajouter"}{" "}
        </Button>
      </Flex>
      <Flex direction="column">
        {hash && (
          <Alert status="success" mt="1rem" mb="1rem">
            <AlertIcon />
            Last transaction hash : {hash.substring(0, 6)}...
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
        {addVoterError && (
          <Alert status="error" mt="1rem" mb="1rem">
            <AlertIcon />
            Error: {addVoterError.shortMessage || addVoterError.message}
          </Alert>
        )}
      </Flex>
      <Heading as="h3" size="sm" mt="2rem" mb={"0.5rem"}>
        Whitelisted voters
      </Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th pl="0px">Name</Th>
            <Th pl="0px">Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {voterRegisteredEvent.map((voter, index) => (
            <Tr key={crypto.randomUUID()}>
              <Td width="80%" p={"1rem"}>
                Voter {voter.voterAddress.substring(0, 6)}...
                {voter.voterAddress.substring(voter.voterAddress.length - 3)}
              </Td>
              <Td width="80%" p={"1rem"}>
                {voter.voterAddress}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {voterRegisteredEvent.length === 0 && (
        <Text color="gray.500" mt="1rem">
          There are no voters registered yet.
        </Text>
      )}
    </div>
  );
};

export default Whitelist;
