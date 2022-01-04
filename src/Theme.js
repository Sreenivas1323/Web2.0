import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
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
