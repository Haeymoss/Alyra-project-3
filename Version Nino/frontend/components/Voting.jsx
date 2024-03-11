'use client'

import { useEffect, useState } from 'react'
import { Flex, Text, Input, Button, useToast, Heading, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
// Données du contrat
import { contractAddress, contractAbi } from '@/constants'

// Wagmi
/*
useReadContract : Lire les données d'un contrat
useAccount : Récupérer les données d'un compte connecté à la DApp via RainbowKit
useWriteContract : Ecrire des données dans un contrat
useWaitForTransactionReceipt : Attendre que la transaction soit confirmée (équivalent de transaction.wait() avec ethers)
useWatchContractEvent : Récupérer en temps réel si un évènement a été émis
*/
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi'
//Viem
// Permet de parser l'event
import { parseAbiItem } from 'viem'

// On importe le publicClient créé (voir ce fichier pour avoir les commentaires sur ce que fait réellement ce publicClient)
import { publicClient } from '../utils/client'

// Components
import Admin from './Admin/Admin'
import Voter from './Voter/Voter'

const Voting = () => {
    const { address,  } = useAccount();

    const { data: ownerAddress } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "owner",
      });

    return (
      <>
        {address === ownerAddress ? (
          <>
            <Admin />
          </>
        ) : (
          <>
            <Voter />
          </>
        )}
      </>
    );
}

export default Voting