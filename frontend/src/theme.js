import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  colorSchemes: {
    // -----------------------------
    //  LIGHT MODE
    // -----------------------------
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#0F5C3A",
          light: "#D9F2E3",
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

      // OVERRIDES AQUI (LIGHT MODE)
      components: {
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              margin: "4px 8px",
              transition: "all 0.6s ease-in-out",

              "&.Mui-selected": {
                backgroundColor: "#D9F2E3 !important",
                color: "#0F5C3A !important",
                fontWeight: 600,
              },

              "&.Mui-selected .MuiListItemIcon-root": {
                color: "#0F5C3A !important",
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
    },

    // -----------------------------
    //  DARK MODE
    // -----------------------------
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#17BF52",
          light: "rgba(23,191,82,0.20)",
          dark: "#0F5C3A",
          contrastText: "#FFFFFF",
        },
        background: {
          default: "#0D0F0E",
          paper: "#121412",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#C9C9C9",
        },
      },

      // OVERRIDES AQUI (DARK MODE)
      components: {
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              margin: "4px 8px",
              transition: "all 0.15s ease-in-out",

              "&.Mui-selected": {
                backgroundColor: "rgba(23,191,82,0.2) !important",
                color: "#17BF52 !important",
                fontWeight: 600,
              },

              "&.Mui-selected .MuiListItemIcon-root": {
                color: "#17BF52 !important",
              },

              "&:hover": {
                backgroundColor: "rgba(23,191,82,0.12)",
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
    },
  },

  // Typography global
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 700, fontSize: "1.6rem" },
    subtitle1: { color: "#939393" },
    button: { textTransform: "none", fontWeight: 600 },
  },

  // Buttons globals (sim, estes podem ficar fora)
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          transition: "all 0.15s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

export default theme;
