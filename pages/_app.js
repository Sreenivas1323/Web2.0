import { Box, ChakraProvider, Container } from "@chakra-ui/react";

import theme from "../src/Theme";
import { Chakra } from "../src/chakra";
import "../styles/globals.css";
import Fonts from "../styles/Theme/fonts";

function MyApp({ Component, pageProps, cookies }) {
  return (
    <>
      <Box
        style={{
          background: "linear-gradient(90deg, #FC466B -2.22%, #3F5EFB 99.02%)",
          width: "100%",
          height: "0.5rem",
        }}
        marginBottom="3vh"
      />
      <Container maxW="900px" mx="auto">
        <Chakra cookies={cookies}>
          <ChakraProvider theme={theme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </Chakra>
      </Container>
    </>
  );
}

export default MyApp;

export { getServerSideProps } from "../src/chakra";
