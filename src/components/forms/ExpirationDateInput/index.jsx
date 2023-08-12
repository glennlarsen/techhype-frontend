import React from "react";
import { InputAdornment } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import FormTextField from "components/forms/FormTextField";

const ExpirationDateInput = ({ value, onChange, error, label }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const formattedValue = formatExpirationDate(inputValue);
    onChange(formattedValue);
  };

  const formatExpirationDate = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    const month = numericValue.slice(0, 2);
    const year = numericValue.slice(2, 4);
    return `${month}/${year}`;
  };

  return (
    <FormTextField
      sx={{ background: "white" }}
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={error && "Invalid expiration date"}
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
        ) : null,
      }}
      variant="outlined"
    />
  );
};

export default ExpirationDateInput;
