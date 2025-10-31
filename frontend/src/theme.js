import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#0F5C3A",     //castleton green
      light: "#17BF52",    //sea green
      dark: "#1E8B68",     //emerald
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#939393",     //battleship gray
      light: "#C9C9C9",    //silver
      dark: "#1C1C1C",     //eerie black
      contrastText: "#FFFFFF",
    },

    error: {
      main: "#EA1000",     //off red
    },

    background: {
      default: "#FFFFFF",  //honeydew
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1C1C1C",
      secondary: "#939393", //battleship gray
    },
  },

  components: {
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
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
              color: "#0F5C3A", //cor principal
              backgroundColor: "#D9F2E3", //leve destaque
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
              backgroundColor: "#0F5C3A", // indicador verde
              width: 4,
            },
          },
        },
      ],
    },
  },
});

export default theme;
