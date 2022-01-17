import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Text } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {};

const theme = extendTheme({
  config,
  colors: {
    transparent: "transparent",
    black: "#0B0B0B",
    white: "#fff",
    ash: "#949494",
    brand: {
      50: "#FC466B",
      100: "#3F5EFB",
    },
  },

  components: {},
  fonts: {
    heading: "MonolisaBold",
    body: "MonolisaRegular",
    Text: "MonolisaBold",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "black")(props),
        color: mode("black", "white")(props),
      },
    }),
  },
});

export default theme;
