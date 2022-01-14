import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    
    @font-face {
        font-family: "MonolisaBold";
        src: url("/fonts/MonoLisa-Bold.woff");
        src: url("/fonts/MonoLisa-Bold.otf");
        font-style: normal;
        font-weight: 800;
        font-display: fallback;
      }

      @font-face {
        font-family: "MonolisaRegular";
        src: url("/fonts/MonoLisa-Regular.woff");
        src: url("/fonts/MonoLisa-Regular.woff");
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
      }

      @font-face {
        
      }
    
    `}
  />
);

export default Fonts;
