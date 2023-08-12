import React from "react";
import { InputAdornment, Tooltip } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import FormTextField from "components/forms/FormTextField";
import HelpIcon from "@mui/icons-material/Help";

const SecurityCodeInput = ({ value, onChange, error, label }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const formattedValue = inputValue.slice(0, 4); // Limit to 4 characters
    onChange(formattedValue);
  };

  return (
    <FormTextField
      fullWidth
      sx={{ background: "white" }}
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={error && "Invalid security code"}
      InputLabelProps={{
        style: { fontSize: 14 }, // Adjust the fontSize for the label
      }}
      inputProps={{
        style: { fontSize: 14 }, // Adjust the fontSize for the input text
        maxLength: 4, // Set maximum length to 4
      }}
      InputProps={{
        endAdornment: error ? (
          <InputAdornment position="end">
            <ErrorRoundedIcon color="error" />
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <Tooltip
              arrow
              title="3-digit security code usually found on the back of your card. "
            >
              <HelpIcon style={{ fontSize: 18 }} />
            </Tooltip>
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
};

export default SecurityCodeInput;
