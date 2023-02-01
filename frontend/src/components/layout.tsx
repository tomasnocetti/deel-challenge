import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Result } from "../entities";
import listOfEndpoints from "../services/endpoint";

import Actions from "./actions";
import Header from "./header";
import Results from "./results";

const Layout = () => {
  const [result, setResult] = useState<Result | undefined>();

  return (
    <>
      <Header />

      <Flex
        padding="20px"
        maxWidth={1400}
        flexDirection={{ lg: "row", sm: "column" }}
        gap={30}
      >
        <Box flexBasis={"50%"}>
          <Heading as="h3" size="lg" marginBottom={10}>
            Request Builder
          </Heading>
          <Actions
            listOfEndpoints={listOfEndpoints}
            setResult={(result) => {
              setResult(result);
            }}
          />
        </Box>
        <Box flexBasis={"50%"}>
          <Heading as="h3" size="lg" marginBottom={10}>
            Results
          </Heading>
          <Results result={result} />
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
