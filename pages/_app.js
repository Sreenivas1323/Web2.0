import { Box, ChakraProvider } from "@chakra-ui/react";

import { Chakra } from "../src/chakra";
import theme from "../src/Theme";
import { Fonts } from "../src/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <Box maxW="900px" mx="auto">
      <Chakra cookies="cookies">
        <ChakraProvider theme={theme}>
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </Chakra>
    </Box>
  );
}

export default MyApp;
