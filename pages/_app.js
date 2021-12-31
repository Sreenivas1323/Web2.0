import { Box, ChakraProvider } from "@chakra-ui/react";

import { Chakra } from "./chakra";

function MyApp({ Component, pageProps }) {
  return (
    <Box maxW="900px" mx="auto">
      <Chakra cookies="cookies">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Chakra>
    </Box>
  );
}

export default MyApp;
