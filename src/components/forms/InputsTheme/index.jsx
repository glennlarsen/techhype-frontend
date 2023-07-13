import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const textFields = createTheme({
  shape: {
    borderRadius: "10px",
  },
  palette: {
    primary: {
      main: "#ffffff", // Set the primary color to white
      hover: "#249ca3", // Set the hover color to your custom primary color
      focus: "#54d4c6", // Set the focus color to your custom primary color
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            color: "#1f2427", // Set the label color to white
            "&:hover": {
              color: "#249ca3 !important", // Set the hover color to your custom primary color
            },
            "&.Mui-focused": {
              color: "#54d4c6", // Set the focus color to your custom primary color
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#1f2427", // Set the underline color to white
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#249ca3 !important", // Set the hover color to your custom primary color
          },
          "& .MuiInput-underline.Mui-focused:before": {
            borderBottomColor: "#54d4c6", // Set the focus color to your custom primary color
          },
          "& .MuiInput-underline.Mui-focused:after": {
            borderBottomColor: "#54d4c6", // Set the focus after color to your custom primary color
          },
          "& .MuiInputBase-input": {
            color: "#1f2427", // Set the input text color to white
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

function InputsTheme({ children }) {
  return <ThemeProvider theme={textFields}>{children}</ThemeProvider>;
}

export default InputsTheme;
