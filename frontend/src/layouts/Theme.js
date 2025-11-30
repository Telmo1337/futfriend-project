import { createTheme } from "@mui/material/styles";

export const futfriendTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: { main: "#00B4D8" },
  },
});
