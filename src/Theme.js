import { extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Bold Monolisa';
        font-style: Bold;
        font-weight: 800;
        font-display: optional;
        src: url('./Fonts/MonoLisa-Bold.otf') format('otf'), url('./Fonts/MonoLisa-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      @font-face {
        font-family: 'Normal Monolisa';
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url('./Fonts/MonoLisa-Regular.otf') format('otf'), url('./Fonts/MonoLisa-Regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
);

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
    },
  },
  fonts: {
    heading: "Bold Monolisa",
    body: "Normal Monolisa",
  },
});

export default theme;
