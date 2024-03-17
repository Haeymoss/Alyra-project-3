"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ReadFunctionsContext from "@/context/ReadFunctions";
import { useAccount } from "wagmi";
import { useContext } from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { address, isConnected } = useAccount();
  const { ownerAddress } = useContext(ReadFunctionsContext);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      pl="2rem"
      pr="2rem"
      pt="0.5rem"
      pb="0.5rem"
    >
      <Heading size="lg">Voting DApp</Heading>
      <Flex align-items="center">
        <ConnectButton
          accountStatus="avatar"
          chainStatus="name"
          showBalance={true}
          label="Connect wallet"
        />
        <Button
          onClick={toggleColorMode}
          alignSelf="center"
          borderRadius="0.7rem"
          ml="0.5rem"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
