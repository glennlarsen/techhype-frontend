import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { color_primary, color_error } from "constants/colors";

const FormTextField = styled(TextField)(({ error }) => ({
  "& label.Mui-focused": {
    color: error ? color_error : color_primary, // Set label color to red on error and on focus
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: color_primary,
  },
  borderRadius: "10px",
  "& fieldset": {
    borderRadius: "10px",
    borderColor: error ? color_error : "rgba(0, 0, 0, 0.23)",
  },
  "& .MuiInputLabel-root": {
    color: error ? color_error : "rgba(0, 0, 0, 0.54)",
    "&.Mui-focused": {
      color: error ? color_error : color_primary, // Set label color to red on focus
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
    "&.Mui-focused fieldset": {
      borderColor: color_primary,
    },
    "&.Mui-error fieldset": {
      borderColor: color_error,
    },
  },
}));

export default FormTextField;
