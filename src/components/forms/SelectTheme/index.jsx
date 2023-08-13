import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { color_primary, color_dark } from "constants/colors";

const selectTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: "10px",
          background: color_dark,
          color: "white",
          width: "60px",
          borderColor: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiInputLabel-outlined": {
            color: "white",
          },
          "&:focus": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: color_primary,
            },
            "& .MuiInputLabel-outlined": {
              color: color_primary,
            },
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: color_primary,
    },
  },
});

const SelectTheme = ({ children }) => {
  return <ThemeProvider theme={selectTheme}>{children}</ThemeProvider>;
};

export default SelectTheme;
