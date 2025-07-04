import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    text: {
      primary: "#000", // Default text color
      secondary: "#333", // Slightly lighter for secondary text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#426B1F", // Default background color
          color: "#fff", // Default text color
          "&:hover": {
            backgroundColor: "#388E3C", // Hover color
          },
        },
        outlined: {
          backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background for outlined variant
          border: "0px",
          color: "#000", // Custom text color for outlined variant
          "&:hover": {
            backgroundColor: "#f6f6f6", // Light green background on hover
          },
        },
      },
    },
  },
});

export default theme;
