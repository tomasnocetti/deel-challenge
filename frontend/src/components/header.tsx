import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <Box
        width="100%"
        height={20}
        padding={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <img
          src={
            "https://19498232.fs1.hubspotusercontent-na1.net/hubfs/19498232/deel-logo-blue.svg"
          }
          height="20"
          alt="deel logo"
        />

        <Heading as="h2" size="md" color="gray.600">
          The Backend Task UI Tool
        </Heading>
      </Box>
    </header>
  );
};

export default Header;
