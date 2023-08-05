import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { color_primary, color_dark, color_light } from "constants/colors";

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: color_primary,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: color_primary,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `2px solid ${color_primary}`,
          },
          "&:after": {
            borderBottom: `2px solid ${color_primary}`,
          },
        },
      },
    },
  },
});

const textFieldsTheme = createTheme({
  ...primaryTheme,
  components: {
    ...primaryTheme.components,
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            color: "#1f2427",
            "&:hover": {
              color: "#249ca3 !important",
            },
            "&.Mui-focused": {
              color: "#54d4c6",
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#1f2427",
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#249ca3 !important",
          },
          "& .MuiInput-underline.Mui-focused:before": {
            borderBottomColor: "#54d4c6",
          },
          "& .MuiInput-underline.Mui-focused:after": {
            borderBottomColor: "#54d4c6",
          },
          "& .MuiInputBase-input": {
            color: "#1f2427",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#1f2427",
          "&.Mui-focused": {
            color: "#54d4c6",
          },
        },
      },
    },
  },
});

function AppTheme({ children }) {
  return <ThemeProvider theme={textFieldsTheme}>{children}</ThemeProvider>;
}

export default AppTheme;
