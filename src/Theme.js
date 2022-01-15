import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {};

const theme = extendTheme({
  config,
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    brand: {
      50: "FC466B",
      100: "3F5EFB",
    },
  },

  components: {},
  fonts: {
    heading: "MonolisaBold",
    body: "MonolisaRegular",
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
