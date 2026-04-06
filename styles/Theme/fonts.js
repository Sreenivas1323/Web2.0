import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: "MonolisaBold";
        src: url("/fonts/MonoLisa-Bold.woff") format("woff"),
             url("/fonts/MonoLisa-Bold.otf") format("opentype");
        font-style: normal;
        font-weight: 800;
        font-display: fallback;
      }

      @font-face {
        font-family: "MonolisaRegular";
        src: url("/fonts/MonoLisa-Regular.woff") format("woff"),
             url("/fonts/MonoLisa-Regular.otf") format("opentype");
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
      }
    `}
  />
);

export default Fonts;
