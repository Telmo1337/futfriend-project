import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F5C3A",  // castleton green
      light: "#17BF52", // sea green
      dark: "#1E8B68",  // emerald
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#939393",  // battleship gray
      light: "#C9C9C9", // silver
      dark: "#1C1C1C",  // eerie black
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EA1000",  // off red
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C1C1C",
      secondary: "#939393",
    },
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h4: { fontWeight: 700, fontSize: "1.6rem" },
    subtitle1: { color: "#939393" },
    button: { textTransform: "none", fontWeight: 600 },
  },

  components: {
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
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#0F5C3A",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#1E8B68" },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderColor: "#0F5C3A",
            color: "#0F5C3A",
            "&:hover": {
              backgroundColor: "#D9F2E3",
              borderColor: "#0F5C3A",
            },
          },
        },
      ],
    },

    MuiTab: {
      styleOverrides: { root: { textTransform: "none" } },
      variants: [
        {
          props: { variant: "sidebar" },
          style: {
            width: "100%",
            justifyContent: "center",
            color: "text.secondary",
            py: 4,
            transition: "all 0.4s ease-in-out",
            "&.Mui-selected": {
              color: "#0F5C3A",
              backgroundColor: "#D9F2E3",
            },
          },
        },
      ],
    },

    MuiTabs: {
      variants: [
        {
          props: { variant: "sidebar" },
          style: {
            "& .MuiTabs-indicator": {
              right: 0,
              left: "auto",
              backgroundColor: "#0F5C3A",
              width: 4,
            },
          },
        },
      ],
    },
  },
});

export default theme;
