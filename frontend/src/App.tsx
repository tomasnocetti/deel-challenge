import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import Layout from "./components/layout";

function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
}

export default App;
