import { createTheme, type PaletteMode } from "@mui/material/styles";

// Define color palette for both modes
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
        ? {
          // Light mode
          background: {
            default: '#FBFBFB',
            paper: '#D9D9D9',
            opposite: '#120D16',
          },
          text: {
            primary: '#000000',
            secondary: '#767575',
            opposite: '#FFFFFF',
            active: '#FF0073'
          },
          divider: '#767575',
          custom: {
            searchBar: '#D9D9D9',
            navBorder: '#59525F',
          },
        }
        : {
          // Dark mode
          background: {
            default: '#120D16',
            paper: '#2C2B35',
            opposite: '#FBFBFB',
          },
          text: {
            primary: '#FBFBFB',
            secondary: '#B6B6B6',
            opposite: '#000000',
            active: '#FBFBFB',
          },
          divider: '#59525F',
          custom: {
            searchBar: '#2C2B35',
            navBorder: '#59525F',
          },
        }),
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#426B1F",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#388E3C",
          },
        },
        outlined: {
          backgroundColor: "transparent",
          border: "0px",
          color: mode === 'light' ? "#000000" : "#FFFFFF",
          "&:hover": {
            backgroundColor: mode === 'light' ? "#f6f6f6" : "#2a2530",
          },
        },
      },
    },
  },
});

// Create theme instance
export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode));
};
