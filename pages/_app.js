import { Box, ChakraProvider } from "@chakra-ui/react";

import theme from "../src/Theme";
import { Chakra } from "../src/chakra";
import "../styles/globals.css";
import Head from "next/head";
import Fonts from "../styles/Theme/fonts";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Box maxW="900px" mx="auto">
        <Chakra cookies="cookies">
          <ChakraProvider theme={theme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </Chakra>
      </Box>
    </>
  );
}

export default MyApp;
