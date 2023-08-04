import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { color_primary } from "constants/colors";

const FormTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: color_primary,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: color_primary,
  },
  // Add the borderRadius property to change the border-radius
  borderRadius: "10px",

  // Set the border-radius for the fieldset element
  "& fieldset": {
    borderRadius: "10px",
  },
  "& .MuiOutlinedInput-root": {
    // Set the border-radius for the outlined input
    borderRadius: "10px",
    "&.Mui-focused fieldset": {
      // Set the border color for the outlined input when focused
      borderColor: color_primary,
    },
  },
});

export default FormTextField;
