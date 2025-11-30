import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  colorSchemes: {
    // -----------------------------
    // 🌞 LIGHT MODE (O TEU ATUAL)
    // -----------------------------
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#0F5C3A",
          light: "#17BF52",
          dark: "#1E8B68",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#939393",
          light: "#C9C9C9",
          dark: "#1C1C1C",
        },
        error: { main: "#EA1000" },
        background: {
          default: "#FFFFFF",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#1C1C1C",
          secondary: "#939393",
        },
      },
    },

    // -----------------------------
    // 🌑 DARK MODE (NOVO)
    // -----------------------------
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#17BF52",         // versão mais viva do verde no dark
          light: "#1E8B68",
          dark: "#0F5C3A",
          contrastText: "#FFFFFF",
        },
        background: {
          default: "#0D0F0E",      // quase preto, FutFriend style
          paper: "#121412",        // sidebar / cards escuros
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#C9C9C9",
        },
      },
    },
  },

  // -------------------------------------------
  // TYPOGRAPHY
  // -------------------------------------------
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h4: { fontWeight: 700, fontSize: "1.6rem" },
    subtitle1: { color: "#939393" },
    button: { textTransform: "none", fontWeight: 600 },
  },

  // -------------------------------------------
  // COMPONENT OVERRIDES
  // -------------------------------------------
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },

    // -----------------------
    // SIDEBAR TOOLPAD
    // -----------------------
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          margin: "4px 8px",
          transition: "all 0.15s ease-in-out",

          "&.Mui-selected": {
            backgroundColor: "var(--mui-palette-primary-light) !important",
            color: "var(--mui-palette-primary-main) !important",
            fontWeight: 600,
          },

          "&.Mui-selected .MuiListItemIcon-root": {
            color: "var(--mui-palette-primary-main) !important",
          },

          "&:hover": {
            backgroundColor: "rgba(23,191,82,0.08)",
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          transition: "all 0.15s ease-in-out",
          minWidth: 40,
        },
      },
    },
  },
});

export default theme;
