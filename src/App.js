import React from "react";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import { Provider } from "react-redux";

import store from "./store/index.ts";

function App() {
  return (
   
      <Provider store={store}>
        <ChakraProvider>
          <Container maxW="container.lg" centerContent>
            <Heading as="h1" size="xl">
              SNAKE GAME
            </Heading>
            //Children components
          </Container>
        </ChakraProvider>
      </Provider>
   
  );
}

export default App;
