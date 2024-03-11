'use client'

import { useEffect, useState } from 'react'
import { Flex, Text, Input, Button, useToast, Heading, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

import { contractAddress, contractAbi } from '@/constants'

import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi'

// Permet de parser l'event
import { parseAbiItem } from 'viem'
// On importe le publicClient créé (voir ce fichier pour avoir les commentaires sur ce que fait réellement ce publicClient)
import { publicClient } from '../../utils/client'

const VotersTable = () => {

  const { address,  } = useAccount();

  //Get the voters
  const { data: voters, isLoading: votersLoading, refetch: refetchVoters } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getVoter",
    account: address
  });
  

  return (
    <Flex direction="column">
      <Text>Voters</Text>
      <Flex direction="column">
        {votersLoading ? (
          <Spinner />
        ) : (
          <Flex direction="column">
            {voters.map((voter, index) => (
              <Flex key={index}>
                <Text>{voter}</Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
};

export default VotersTable;