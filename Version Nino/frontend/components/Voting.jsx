"use client";
// Données du contrat
import { contractAddress, contractAbi } from "@/constants";

// Wagmi
/*
useReadContract : Lire les données d'un contrat
useAccount : Récupérer les données d'un compte connecté à la DApp via RainbowKit
useWriteContract : Ecrire des données dans un contrat
useWaitForTransactionReceipt : Attendre que la transaction soit confirmée (équivalent de transaction.wait() avec ethers)
useWatchContractEvent : Récupérer en temps réel si un évènement a été émis
*/
import { useReadContract, useAccount } from "wagmi";
//Viem
// Permet de parser l'event
import { parseAbiItem } from "viem";

// On importe le publicClient créé (voir ce fichier pour avoir les commentaires sur ce que fait réellement ce publicClient)
import { publicClient } from "../utils/client";

// Components
import Admin from "./Admin/Admin";
import Voter from "./Voter/Voter";
import ReadFunctionsContext from "@/context/ReadFunctions";
import { useContext } from "react";
import { Flex } from "@chakra-ui/react";

const Voting = () => {
  const { address } = useAccount();
  const { ownerAddress } = useContext(ReadFunctionsContext);

  return (
    <Flex width="100%" pl="5rem" pr="5rem">
      {address === ownerAddress ? (
        <>
          <Admin />
        </>
      ) : (
        <>
          <Voter />
        </>
      )}
    </Flex>
  );
};

export default Voting;
