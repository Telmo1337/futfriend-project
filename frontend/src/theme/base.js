// src/theme/base.js
export default {
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 700, fontSize: "1.6rem" },
    subtitle1: { color: "#939393" },
    button: { textTransform: "none", fontWeight: 600 },
  },

  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
};
