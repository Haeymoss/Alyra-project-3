"use client";
import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      p="2rem"
      justifyContent="center"
      alignItems="center"
      backgroundColor="color1"
    >
      <Text color="white">Voting DApp</Text>
    </Flex>
  );
};

export default Footer;
