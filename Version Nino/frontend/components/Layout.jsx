"use client";
import Header from "./Header";
import Footer from "./Footer";
import { Divider, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="color1"
    >
      <Header />
      <Divider colorScheme="red" size="sm" />
      <Flex grow="1" p="2rem">
        {children}
      </Flex>
      <Divider color="#888C9E" />
      <Footer />
    </Flex>
  );
};

export default Layout;
