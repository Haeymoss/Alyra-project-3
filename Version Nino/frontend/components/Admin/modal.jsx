`use client`;

import React, { useContext, useState } from "react";

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
} from "@chakra-ui/react";

import { publicClient } from "../../utils/client";
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";
import { contractAddress, contractAbi } from "@/constants";
import { parseAbiItem } from "viem";


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


    return (
        <>
            <Button
                mt={4}
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }}
            >
                Afficher l'Id de la proposition gagnante 
            </Button>
            <Modal isOpen={isOpen} size={"2xl"} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader >Vainqueur</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex align="center" justify="center">
                          {winner !== undefined ? `La proposition gagnante est la numéro : ${winner}` : 'Chargement...'}
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
