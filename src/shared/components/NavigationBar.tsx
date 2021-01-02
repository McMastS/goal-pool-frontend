import React, { useState } from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";

type MenuItemsProps = {
    children: React.ReactNode;
};

const MenuItems = ({ children }: MenuItemsProps) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleToggle = () => setShow(!show);

  const handleLogout = () => {
    history.push("/login");
  }
  
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Spencer's Goal Pool
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>Blog</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px" onClick={handleLogout}>
          Log out
        </Button>
      </Box>
    </Flex>
  );
};

export default NavigationBar;