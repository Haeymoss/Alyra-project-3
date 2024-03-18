"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Lorem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  Input,
  Center,
  useToast,
} from "@chakra-ui/react";
import { publicClient } from "../../utils/client";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,

} from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import { parseAbiItem } from "viem";
import { confetti } from "@/utils/confetis";
import ReadFunctionsContext from "@/context/ReadFunctions";

function ProposalModal() {
  const OverlayOne = () => (
    <ModalOverlay bg="grey.100" backdropFilter="blur(10px) hue-rotate(2deg)" />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const { address } = useAccount();
  const toast = useToast();
  const [results, setresults] = useState("");

  const [showConfetti, setShowConfetti] = useState(false);
  const { refetchWinningProposalId, winner } = useContext(ReadFunctionsContext);




  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false); // Désactive le confetti à la fermeture de la modale
    }
  }, [isOpen]);

  return (
    <div>
      <Button onClick={() => {onOpen(), refetchWinningProposalId()}} colorScheme="blue" width={"100%"}>
        Display the winning proposal
      </Button>
      <Modal isOpen={isOpen} size={"2xl"} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Winner</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" justify="center">
              {winner !== undefined
                ? `The winning proposal is proposal n°${winner}`
                : "Chargement..."}
              {showConfetti && confetti()}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
   
  );

}

export default ProposalModal;
