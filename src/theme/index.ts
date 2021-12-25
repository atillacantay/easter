import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
