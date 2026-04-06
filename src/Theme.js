import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    transparent: "transparent",
    black: "#0B0B0B",
    white: "#EDEDED",
    ash: "#666666",
    dim: "#999999",
    brand: {
      50: "#EDEDED",
      100: "#EDEDED",
    },
  },

  components: {},
  fonts: {
    heading: "MonolisaBold",
    body: "MonolisaRegular",
  },
  fontSizes: {
    "display": "52px",
    "h1": "40px",
    "h2": "28px",
    "h3": "20px",
    "body": "15px",
    "sm": "13px",
    "label": "11px",
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
