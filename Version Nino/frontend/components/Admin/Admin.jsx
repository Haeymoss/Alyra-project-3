'use client'
import { useEffect, useState } from 'react'
import { Flex, Text, Input, Button, useToast, Heading, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Grid, GridItem } from '@chakra-ui/react'
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi'
import { parseAbiItem } from 'viem'
import { contractAddress, contractAbi } from '@/constants'
import { publicClient } from '../../utils/client'

const Admin = () => {

  const { address,  } = useAccount();

  //Add Voter
    const [registeredAddress, setRegisteredAddress] = useState(null);
    const { data: hash, error: addVoterError, isPending: setIsPending, writeContract } = useWriteContract();

    const addVoter = async () => {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "addVoter",
        account: address,
        args: [registeredAddress]
      })    
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt(hash);
  
  //Get workflowStatus
    const { data: workflowStatus } = useReadContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "workflowStatus",
    });

    return (
      <Flex direction="column" width="100%">
        <Heading as='h1' size='xl' mb="2rem">
          Bonjour chèr(e) administrateur...
        </Heading>
        <Grid templateColumns="1fr 1fr 1fr" gap={4} height="100%">
          <GridItem bg="tomato" colSpan={1} p="1rem" borderRadius="10px">
            <Heading as='h2' size='lg' mb="2rem" align="center">
              Whitelist
            </Heading>
            <Heading as='h3' size='sm' mb="1rem">
              Ajouter un électeur
            </Heading>
            <Flex>
              <Input placeholder='Voter Address' onChange={(e) => { setRegisteredAddress(e.target.value)}} mr="0.5rem"/>
              <Button disabled={setIsPending} onClick={addVoter}>{setIsPending ? 'Confirming...' : 'Ajouter'} </Button>
            </Flex>
            {/* <Heading as='h3' size='sm' mt="2rem">
              Liste des électeurs
            </Heading> */}
          </GridItem>
          <GridItem bg="orange" colSpan={1} p="1rem" borderRadius="10px">
            <Heading as='h2' size='lg' mb="2rem" align="center">
                Workflow
            </Heading>
            <Heading as='h3' size='sm' mt="2rem" mb="1rem">
              Workflow actuel : {workflowStatus === 0 ? "Enregistrement des électeurs" : workflowStatus === 1 ? "Enregistrement des propositions en cours" : workflowStatus === 2 ? "Enregistrement des propositions terminées" : workflowStatus === 3 ? "Session de vote en cours" : workflowStatus === 4 ? "Session de vote terminée" : workflowStatus === 5 ? "Comptabilisation des votes" : "Erreur"}
            </Heading>
            <Text mb="0.5rem">Passez à l'étape suivante :</Text>    
            <Button width="100%">
              {workflowStatus === 0 ? "Enregistrement des propositions" : workflowStatus === 1 ? "Fin de l'enregistrement des propositions" : workflowStatus === 2 ? "Début de la session de vote" : workflowStatus === 3 ? "Fin de la session de vote" : workflowStatus === 4 ? "Comptabilisation des votes" : "Erreur"}
            </Button>                     
          </GridItem>
          <GridItem bg="teal" colSpan={1} p="1rem" borderRadius="10px">
            <Heading as='h2' size='lg' mb="1rem" align="center">
                Résultats
            </Heading>
          </GridItem>
        </Grid>
      </Flex>
    );
}

export default Admin