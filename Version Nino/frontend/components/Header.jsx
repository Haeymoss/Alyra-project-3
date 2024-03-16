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

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      pl="2rem"
      pr="2rem"
      pt="1rem"
      pb="1rem"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Voting DApp
      </Text>
      <Flex>
        <Card maxW="md" size="xs" p="0.7rem" borderRadius="1rem">
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  size="sm"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Box>
                  <Heading size="md">Admin</Heading>
                </Box>
                <ConnectButton
                  accountStatus="avatar"
                  chainStatus="name"
                  showBalance={true}
                  label="Sign in"
                />
                <Button
                  onClick={toggleColorMode}
                  alignSelf="center"
                  borderRadius="1rem"
                >
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Header;
