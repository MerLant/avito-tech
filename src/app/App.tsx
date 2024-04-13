import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import AppRouter from "./router";
import { Layout } from "src/shared/ui";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <AppRouter />
    </Layout>
  </ChakraProvider>
);
