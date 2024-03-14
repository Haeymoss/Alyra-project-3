// On utilise useState ou useEffect ou ChakraUI, donc on met un use client.
'use client'
import { useEffect, useState } from 'react'
import { Flex, Text, Input, Button, useToast, Heading, Spinner } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons"

// On importe les données du contrat
import { contractAddress, contractAbi } from '@/constants'

// On importe les éléments de Wagmi qui vont nous permettre de :
/*
useReadContract : Lire les données d'un contrat
useAccount : Récupérer les données d'un compte connecté à la DApp via RainbowKit
useWriteContract : Ecrire des données dans un contrat
useWaitForTransactionReceipt : Attendre que la transaction soit confirmée (équivalent de transaction.wait() avec ethers)
useWatchContractEvent : Récupérer en temps réel si un évènement a été émis
*/
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

// Permet de parser l'event
import { parseAbiItem } from 'viem'
// On importe le publicClient créé (voir ce fichier pour avoir les commentaires sur ce que fait réellement ce publicClient)
import { publicClient } from '../../utils/client'
import { Purple_Purse } from 'next/font/google'


const Proposition = () => {

  const {address} = useAccount();
  const toast = useToast();

  const [maProposition, setMaProposition] = useState(''); // On initialise la proposition à vide
  const { data: hash, isPending, writeContract} = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "La proposition a été ajoutée avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setMaProposition(""); // Réinitialiser la valeur de l'input
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

  const addProposal = async () => {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "addProposal",
      args: [maProposition],
      account: address,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt(hash);


  return (
    <>

    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      h="100%"

      p={4}
      borderRadius={8}
      mt="1rem"
      >
        <heading>Proposition</heading>
      <Input
        value={maProposition}
        onChange={(e) => setMaProposition(e.target.value)}
        placeholder="Saisissez votre proposition"
        m="10px"
        />
      <Button leftIcon={<AddIcon />} colorScheme='teal' size='lg' p="10px" onClick={addProposal}>{isPending ? "En cours d'ajout ..." : "Ajouter"}</Button>
      <br />
      
      </Flex>

    </>
  )
}

export default Proposition





// il faut un text hotlder qui va recup l evenement et le reporter dans la blockchain
// emit lorsque realisé