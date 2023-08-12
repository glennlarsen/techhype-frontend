import React from "react";
import { InputAdornment, Tooltip } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import FormTextField from "components/forms/FormTextField";
import LockIcon from "@mui/icons-material/Lock";

const CreditCardInput = ({ value, onChange, error, label }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value.replace(/\s/g, "");
    const formattedValue = inputValue
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
    onChange(formattedValue);
  };

  return (
    <FormTextField
      sx={{ background: "white" }}
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={error && "Invalid credit card number"}
      InputLabelProps={{
        style: { fontSize: 14 }, // Adjust the fontSize for the label
      }}
      inputProps={{
        style: { fontSize: 14 }, // Adjust the fontSize for the input text
      }}
      InputProps={{
        endAdornment: error ? (
          <InputAdornment position="end">
            <ErrorRoundedIcon color="error" />
          </InputAdornment>
        ) : (
          <InputAdornment position="end">
            <Tooltip arrow title="All transactions are secure and encrypted.">
              <LockIcon style={{ fontSize: 18 }} />
            </Tooltip>
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
};

export default CreditCardInput;
