// TextFieldComponent.js
import React from "react";
import TextField from "@mui/material/TextField";
import { color_primary } from "constants/colors";
import ListItem from "@mui/material/ListItem";

const inputProps = {
  readOnly: true,
  style: {
    color: "white", // Text input color
    border: "none", // No borders
    paddingBottom: 0,
  },
};

const labelProps = {
  style: {
    color: color_primary, // Label color (you might need to replace 'color_primary' with the actual color value)
  },
};

// Set focused border color to transparent
const focusedBorderStyle = {
  "& fieldset": {
    borderColor: "transparent !important",
  },
};

function TextFieldComponent({ label, value }) {
  return (
    <ListItem sx={{ padding: "1em 0 .5em 0" }}>
      <TextField
        label={label}
        multiline
        value={value}
        InputProps={inputProps}
        InputLabelProps={labelProps}
        sx={{ ...focusedBorderStyle, flex: 1, whiteSpace: "pre-line" }}
      />
    </ListItem>
  );
}

export default TextFieldComponent;
