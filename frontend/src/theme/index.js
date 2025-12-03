// src/theme/index.js
import {
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

import base from "./base";
import colorSchemes from "./ColorSchemes";

const theme = extendTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes,
  ...base,
});

export default theme;
