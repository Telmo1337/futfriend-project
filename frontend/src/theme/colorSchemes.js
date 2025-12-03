// src/theme/colorSchemes.js

export default {
  light: {
    palette: {
      mode: "light",
      primary: {
        main: "#0F5C3A",
        light: "#D9F2E3",
        dark: "#1E8B68",
        contrastText: "#FFFFFF",
      },
      text: {
        primary: "#1C1C1C",
        secondary: "#939393",
      },
      background: {
        default: "#FFFFFF",
        paper: "#FFFFFF",
      },
    },

    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            margin: "4px 8px",
            transition: "all 0.4s ease-in-out",
            "&.Mui-selected": {
              backgroundColor: "#D9F2E3 !important",
              color: "#0F5C3A !important",
              fontWeight: 600,
            },
            "&:hover": {
              backgroundColor: "rgba(23,191,82,0.08)",
            },
          },
        },
      },
    },
  },

  dark: {
    palette: {
      mode: "dark",
      primary: {
        main: "#17BF52",
        light: "rgba(23,191,82,0.25)",
        dark: "#0F5C3A",
        contrastText: "#FFFFFF",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#C9C9C9",
      },
      background: {
        default: "#0D0F0E",
        paper: "#121412",
      },
    },

    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            margin: "4px 8px",
            transition: "all 0.4s ease-in-out",
            "&.Mui-selected": {
              backgroundColor: "rgba(23,191,82,0.25) !important",
              color: "#17BF52 !important",
              fontWeight: 600,
            },
            "&:hover": {
              backgroundColor: "rgba(23,191,82,0.12)",
            },
          },
        },
      },
    },
  },
};
