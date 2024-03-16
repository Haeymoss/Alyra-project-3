import { extendTheme } from "@chakra-ui/react";

const darkTheme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  colors: {
    color1: "#1B2030",
    color2: "#292D41",
    color3: "#2EBAC6",
    color4: "B6509E",
    white1: "FFFFFF",
    white2: "#319795",
    grey1: "#9396A4",
  },
  shadows: {
    sm: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0px 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0px 20px 25px rgba(0, 0, 0, 0.1)",
  },
  // Ajoutez d'autres styles personnalisés pour le thème sombre
});

export default darkTheme;
