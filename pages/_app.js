import { ChakraProvider, Container } from "@chakra-ui/react";

import theme from "../src/Theme";
import { Chakra } from "../src/chakra";
import "../styles/globals.css";
import Fonts from "../styles/Theme/fonts";
import { BottomPortion } from "../src/components/CustomComponents";
import Header from "../src/components/Header";

function MyApp({ Component, pageProps, cookies }) {
  return (
    <>
      <Chakra cookies={cookies}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Header />
          <Container maxW="1080px" mx="auto">
            <Component {...pageProps} />
          </Container>
          <BottomPortion />
        </ChakraProvider>
      </Chakra>
    </>
  );
}

export default MyApp;

export { getServerSideProps } from "../src/chakra";
