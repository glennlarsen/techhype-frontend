import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const textFields = createTheme({
  shape: {
    borderRadius: "12px",
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
            color: "#ffffff", // Set the label color to white
            "&:hover": {
              color: "#249ca3 !important", // Set the hover color to your custom primary color
            },
            "&.Mui-focused": {
              color: "#54d4c6", // Set the focus color to your custom primary color
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#ffffff", // Set the underline color to white
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
            color: "#ffffff", // Set the input text color to white
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            color: "#249ca3",
          },
        },
        icon: {
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-focused": {
            color: "#54d4c6",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "black",
          backgroundColor: "white",
          "&.Mui-selected": {
            backgroundColor: "#1f2427 !important",
            color: "#54d4c6",
            "&:hover": {
              backgroundColor: "#1f2427",
              color: "#54d4c6",
            },
          },
          "&:hover": {
            backgroundColor: "grey",
            color: "white",
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
