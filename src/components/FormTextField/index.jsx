import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const FormTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#50CCC1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#50CCC1",
  },
  "& .MuiInput-underline-focus": {
    borderBottomColor: "#50CCC1",
  },
  "& .MuiInput-root:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-root:after": {
    borderBottomColor: "#50CCC1",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#50CCC1",
  },
  "&:hover .MuiInput-underline:before": {
    borderBottomColor: "#50CCC1",
  },
  "&:hover .MuiInput-underline:after": {
    borderBottomColor: "#50CCC1",
  },
  "& .MuiInput-input": {
    color: "white",
  },
});

export default FormTextField;
