import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
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

export const theme = Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        border: `1px solid ${defaultTheme.palette.grey[800]}`,
        borderRadius: defaultTheme.shape.borderRadius,
      },
      container: {
        marginTop: defaultTheme.spacing(0.5),
      },
      editor: {
        marginLeft: defaultTheme.spacing(1),
      },
      editorContainer: {
        width: "auto",
        cursor: "text",
        margin: defaultTheme.spacing(1, 0, 0, 0),
        padding: defaultTheme.spacing(0, 0, 1, 0),
      },
    },
  },
});
