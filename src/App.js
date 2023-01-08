import { ChakraProvider, Container, Heading } from "@chakra-ui/react";

import React from "react";
import CanvasBoard from "./components/CanvasBoard.tsx";
import ScoreCard from "./components/ScoreCard.tsx";


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
          <ScoreCard />
          <CanvasBoard height={600} width={1000} />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
