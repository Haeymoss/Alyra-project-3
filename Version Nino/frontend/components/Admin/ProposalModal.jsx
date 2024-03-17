/** @format */

`use client`;

import React, { useContext, useState, useEffect } from "react";

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Lorem,
    Modal,
    useToast,
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


function ProposalModal() {
    const OverlayOne = () => (
        <ModalOverlay
            bg="grey.100"
            backdropFilter="blur(10px) hue-rotate(2deg)"
        />
    );

    

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    const { address } = useAccount();
    const toast = useToast();
    const [results, setresults] = useState("");
    const { data: winner } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "winningProposalID",
    });

    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
          setShowConfetti(true); // Active le confetti à l'ouverture de la modale
        } else {
          setShowConfetti(false); // Désactive le confetti à la fermeture de la modale
        }
      }, [isOpen]);

    return (
        <>
      <Button mt={4} onClick={onOpen}>
        Afficher l'Id de la proposition gagnante
      </Button>
      <Modal isOpen={isOpen} size={"2xl"} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Vainqueur</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" justify="center">
              {winner !== undefined
                ? `La proposition gagnante est la numéro : ${winner}`
                : "Chargement..."}
              {showConfetti && confetti()}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
}

export default ProposalModal;
